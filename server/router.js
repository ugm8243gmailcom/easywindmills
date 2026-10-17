/**
 * EasyWindmill - API Request Router and Middleware
 *
 * Implements Connect/HTTP-compatible middleware for Vite dev server
 * and standalone Node.js HTTP server.
 */

import { TURBINE_MODEL_METADATA } from './modelConfig.js';
import { ValidationError, validateWindSpeed, validateRotorRadius, validateRotorDiameter,
  validateBladeLength, validateAirDensity, validateCp, validateEfficiency,
  validateGearboxRatio, validateTipSpeedRatio, validateMaxRPM,
  validateCurveRange, validateVerifiedCurveData, validateFiniteNumber } from './validation.js';
import { calculateRotorGeometry, calculateAvailableWindPower,
  calculateMechanicalPower, calculateElectricalPower, calculateRotorDynamics,
  calculateGearboxOutput, generateEducationalPowerCurve, interpolateVerifiedPowerCurve } from './physics.js';
import { defaultWeatherService } from './weather/index.js';
import { BETZ_LIMIT, STANDARD_AIR_DENSITY_KG_M3 } from './constants.js';

/**
 * Sends a structured JSON HTTP response.
 */
function sendJson(res, statusCode, data) {
  const payload = JSON.stringify(data);
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.end(payload);
}

/**
 * Parses JSON body from incoming HTTP request.
 */
function parseRequestBody(req) {
  return new Promise((resolve, reject) => {
    // If body was already parsed by a preceding middleware
    if (req.body && typeof req.body === 'object') {
      return resolve(req.body);
    }

    let rawData = '';
    req.on('data', chunk => {
      rawData += chunk;
      if (rawData.length > 1e6) { // 1 MB limit
        reject(new ValidationError('body', 'Payload exceeds maximum limit of 1 MB.'));
      }
    });

    req.on('end', () => {
      if (!rawData.trim()) {
        return resolve({});
      }
      try {
        const parsed = JSON.parse(rawData);
        resolve(parsed);
      } catch (err) {
        reject(new ValidationError('body', `Malformed JSON request body: ${err.message}`));
      }
    });

    req.on('error', err => reject(err));
  });
}

/**
 * Handles GET /api/health
 */
function handleHealth(req, res) {
  sendJson(res, 200, {
    status: 'ok',
    service: 'easywindmill-simulation-api',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    model: {
      id: TURBINE_MODEL_METADATA.modelId,
      name: TURBINE_MODEL_METADATA.modelName,
      architecture: TURBINE_MODEL_METADATA.architecture
    }
  });
}

/**
 * Handles GET /api/simulation/model
 */
function handleSimulationModel(req, res) {
  sendJson(res, 200, {
    status: 'success',
    model: TURBINE_MODEL_METADATA
  });
}

/**
 * Handles POST /api/simulation/calculate
 */
async function handleSimulationCalculate(req, res) {
  const body = await parseRequestBody(req);

  const useEducationalAssumptions = Boolean(body.useEducationalAssumptions);
  const baseline = TURBINE_MODEL_METADATA.educationalBaseline;

  const userSuppliedParameters = {};
  const educationalAssumptions = {};
  const unavailableValues = [];
  const calculatedValues = [];

  // 1. Wind Speed
  if (body.windSpeed_mps === undefined || body.windSpeed_mps === null) {
    throw new ValidationError('windSpeed_mps', 'Wind speed is required for simulation calculations.');
  }
  const windSpeed_mps = validateWindSpeed(body.windSpeed_mps);
  userSuppliedParameters.windSpeed_mps = windSpeed_mps;

  // 2. Air Density
  let airDensity_kgpm3;
  if (body.airDensity_kgpm3 !== undefined && body.airDensity_kgpm3 !== null) {
    airDensity_kgpm3 = validateAirDensity(body.airDensity_kgpm3);
    userSuppliedParameters.airDensity_kgpm3 = airDensity_kgpm3;
  } else if (useEducationalAssumptions) {
    airDensity_kgpm3 = baseline.airDensity_kgpm3;
    educationalAssumptions.airDensity_kgpm3 = {
      value: airDensity_kgpm3,
      unit: 'kg/m^3',
      assumption: 'Standard ISO sea-level dry air density at 15 deg C.'
    };
  } else {
    airDensity_kgpm3 = STANDARD_AIR_DENSITY_KG_M3;
    educationalAssumptions.airDensity_kgpm3 = {
      value: airDensity_kgpm3,
      unit: 'kg/m^3',
      assumption: 'Default standard ISO atmospheric sea-level density.'
    };
  }

  // 3. Rotor Geometry
  let geometryInput = {};
  if (body.rotorRadius_m !== undefined && body.rotorRadius_m !== null) {
    geometryInput.rotorRadius_m = validateRotorRadius(body.rotorRadius_m);
    userSuppliedParameters.rotorRadius_m = geometryInput.rotorRadius_m;
  } else if (body.rotorDiameter_m !== undefined && body.rotorDiameter_m !== null) {
    geometryInput.rotorDiameter_m = validateRotorDiameter(body.rotorDiameter_m);
    userSuppliedParameters.rotorDiameter_m = geometryInput.rotorDiameter_m;
  } else if (body.bladeLength_m !== undefined && body.bladeLength_m !== null) {
    geometryInput.bladeLength_m = validateBladeLength(body.bladeLength_m);
    userSuppliedParameters.bladeLength_m = geometryInput.bladeLength_m;
  } else if (useEducationalAssumptions) {
    geometryInput.rotorRadius_m = baseline.rotorRadius_m;
    educationalAssumptions.rotorRadius_m = {
      value: baseline.rotorRadius_m,
      unit: 'metres',
      assumption: 'Educational baseline rotor radius (80m diameter, representative utility-scale 3-blade HAWT).'
    };
  } else {
    throw new ValidationError(
      'rotorRadius_m',
      'Rotor geometry is required. Provide rotorRadius_m, rotorDiameter_m, bladeLength_m, or enable useEducationalAssumptions.'
    );
  }

  const geometry = calculateRotorGeometry(geometryInput);
  calculatedValues.push('rotorGeometry.sweptArea_m2', 'rotorGeometry.rotorDiameter_m');

  // 4. Available Wind Power
  const availableWindPower_W = calculateAvailableWindPower(geometry.sweptArea_m2, windSpeed_mps, airDensity_kgpm3);
  calculatedValues.push('aerodynamics.availableWindPower_W');

  // 5. Captured Mechanical Power
  let cp = null;
  if (body.cp !== undefined && body.cp !== null) {
    cp = validateCp(body.cp);
    userSuppliedParameters.cp = cp;
  } else if (useEducationalAssumptions) {
    cp = baseline.assumedCp;
    educationalAssumptions.cp = {
      value: cp,
      assumption: 'Educational baseline constant Cp = 0.42. Below Betz limit (0.593), realistic for modern 3-bladed HAWT.'
    };
  }

  let mechanicalPower_W = null;
  if (cp !== null) {
    mechanicalPower_W = calculateMechanicalPower(availableWindPower_W, cp);
    calculatedValues.push('aerodynamics.mechanicalPower_W');
  } else {
    unavailableValues.push({
      field: 'aerodynamics.mechanicalPower_W',
      reason: 'Aerodynamic power coefficient Cp was not supplied and educational assumptions were not selected.'
    });
  }

  // 6. Drivetrain and Generator Efficiency
  let drivetrainEfficiency = null;
  let generatorEfficiency = null;

  if (body.drivetrainEfficiency !== undefined && body.drivetrainEfficiency !== null) {
    drivetrainEfficiency = validateEfficiency(body.drivetrainEfficiency, 'drivetrainEfficiency');
    userSuppliedParameters.drivetrainEfficiency = drivetrainEfficiency;
  } else if (useEducationalAssumptions) {
    drivetrainEfficiency = baseline.assumedDrivetrainEfficiency;
    educationalAssumptions.drivetrainEfficiency = {
      value: drivetrainEfficiency,
      assumption: 'Educational baseline mechanical drivetrain efficiency (95% for parallel-shaft gearbox and bearings).'
    };
  }

  if (body.generatorEfficiency !== undefined && body.generatorEfficiency !== null) {
    generatorEfficiency = validateEfficiency(body.generatorEfficiency, 'generatorEfficiency');
    userSuppliedParameters.generatorEfficiency = generatorEfficiency;
  } else if (useEducationalAssumptions) {
    generatorEfficiency = baseline.assumedGeneratorEfficiency;
    educationalAssumptions.generatorEfficiency = {
      value: generatorEfficiency,
      assumption: 'Educational baseline synchronous generator electromechanical conversion efficiency (94%).'
    };
  }

  const electricalResult = calculateElectricalPower(mechanicalPower_W, drivetrainEfficiency, generatorEfficiency);
  if (electricalResult.status === 'calculated') {
    calculatedValues.push('electrical.electricalPower_W', 'electrical.losses');
  } else {
    unavailableValues.push({
      field: 'electrical.electricalPower_W',
      reason: electricalResult.reason
    });
  }

  // 7. Rotor Speed, Tip-Speed Ratio and Aerodynamic Torque
  let targetTipSpeedRatio = null;
  if (body.targetTipSpeedRatio !== undefined && body.targetTipSpeedRatio !== null) {
    targetTipSpeedRatio = validateTipSpeedRatio(body.targetTipSpeedRatio);
    userSuppliedParameters.targetTipSpeedRatio = targetTipSpeedRatio;
  } else if (useEducationalAssumptions) {
    targetTipSpeedRatio = baseline.assumedTargetTipSpeedRatio;
    educationalAssumptions.targetTipSpeedRatio = {
      value: targetTipSpeedRatio,
      assumption: 'Educational baseline target tip-speed ratio lambda = 7.5 for optimal 3-bladed rotor aerodynamics.'
    };
  }

  let maxRotorRPM = null;
  if (body.maxRotorRPM !== undefined && body.maxRotorRPM !== null) {
    maxRotorRPM = validateMaxRPM(body.maxRotorRPM);
    userSuppliedParameters.maxRotorRPM = maxRotorRPM;
  } else if (useEducationalAssumptions) {
    maxRotorRPM = baseline.assumedMaxRotorRPM;
    educationalAssumptions.maxRotorRPM = {
      value: maxRotorRPM,
      assumption: 'Educational upper rotor speed limit of 20.0 RPM for 80m diameter rotor.'
    };
  }

  let maxTipSpeed_mps = null;
  if (body.maxTipSpeed_mps !== undefined && body.maxTipSpeed_mps !== null) {
    maxTipSpeed_mps = validateFiniteNumber(body.maxTipSpeed_mps, 'maxTipSpeed_mps', { min: 1, max: 150 });
    userSuppliedParameters.maxTipSpeed_mps = maxTipSpeed_mps;
  }

  const rotorDynamics = calculateRotorDynamics({
    windSpeed_mps,
    rotorRadius_m: geometry.rotorRadius_m,
    mechanicalPower_W,
    targetTipSpeedRatio,
    maxRotorRPM,
    maxTipSpeed_mps
  });

  if (rotorDynamics.rotorRPM !== null) {
    calculatedValues.push('rotorDynamics.rotorRPM', 'rotorDynamics.angularVelocity_radps', 'rotorDynamics.aerodynamicTorque_Nm');
  } else {
    unavailableValues.push({
      field: 'rotorDynamics.rotorRPM',
      reason: rotorDynamics.reason
    });
  }

  // 8. Gearbox and Synchronous Generator Speed
  let gearboxRatio = null;
  if (body.gearboxRatio !== undefined && body.gearboxRatio !== null) {
    gearboxRatio = validateGearboxRatio(body.gearboxRatio);
    userSuppliedParameters.gearboxRatio = gearboxRatio;
  } else if (useEducationalAssumptions) {
    gearboxRatio = baseline.assumedGearboxRatio;
    educationalAssumptions.gearboxRatio = {
      value: gearboxRatio,
      assumption: 'Educational baseline parallel-shaft gearbox step-up ratio (90:1, generator-side speed / rotor-side speed).'
    };
  }

  const gearboxResult = calculateGearboxOutput({
    rotorAngularVelocity_radps: rotorDynamics.angularVelocity_radps,
    rotorRPM: rotorDynamics.rotorRPM,
    aerodynamicTorque_Nm: rotorDynamics.aerodynamicTorque_Nm,
    gearboxRatio,
    gearboxEfficiency: drivetrainEfficiency
  });

  if (gearboxResult.status === 'calculated') {
    calculatedValues.push('drivetrain.generatorShaftRPM', 'drivetrain.generatorShaftAngularVelocity_radps');
  } else {
    unavailableValues.push({
      field: 'drivetrain.generatorShaftRPM',
      reason: gearboxResult.reason
    });
  }

  sendJson(res, 200, {
    status: 'success',
    timestamp: new Date().toISOString(),
    inputs: {
      windSpeed_mps,
      airDensity_kgpm3,
      geometryInput,
      cp,
      drivetrainEfficiency,
      generatorEfficiency,
      targetTipSpeedRatio,
      gearboxRatio,
      maxRotorRPM,
      useEducationalAssumptions
    },
    results: {
      geometry,
      aerodynamics: {
        availableWindPower_W,
        availableWindPower_kW: availableWindPower_W / 1000.0,
        cp,
        betzLimit: BETZ_LIMIT,
        mechanicalPower_W,
        mechanicalPower_kW: mechanicalPower_W !== null ? mechanicalPower_W / 1000.0 : null
      },
      rotorDynamics,
      drivetrain: gearboxResult,
      electrical: electricalResult
    },
    metadata: {
      verifiedInputParameters: {
        rotorArchitecture: TURBINE_MODEL_METADATA.architecture.rotorAxis,
        bladeCount: TURBINE_MODEL_METADATA.architecture.bladeCount,
        drivetrainType: TURBINE_MODEL_METADATA.architecture.drivetrainType,
        generatorType: TURBINE_MODEL_METADATA.architecture.generatorType
      },
      userSuppliedParameters,
      educationalAssumptions,
      calculatedValues,
      unavailableValues,
      limitations: TURBINE_MODEL_METADATA.modelLimitations,
      references: TURBINE_MODEL_METADATA.references
    }
  });
}

/**
 * Handles POST /api/simulation/power-curve
 */
async function handleSimulationPowerCurve(req, res) {
  const body = await parseRequestBody(req);
  const mode = (body.mode || 'educational_theoretical').trim().toLowerCase();

  if (mode === 'verified_turbine_curve') {
    if (!body.dataSource || typeof body.dataSource !== 'string' || !body.dataSource.trim()) {
      throw new ValidationError('dataSource', 'Verified turbine power curve requires a documented source citation.');
    }
    const dataPoints = validateVerifiedCurveData(body.dataPoints);

    let queryWindSpeeds;
    if (Array.isArray(body.queryWindSpeeds)) {
      queryWindSpeeds = body.queryWindSpeeds.map((v, i) => validateWindSpeed(v, `queryWindSpeeds[${i}]`));
    } else {
      const minSpeed = body.windSpeedMin !== undefined ? body.windSpeedMin : dataPoints[0].windSpeed_mps;
      const maxSpeed = body.windSpeedMax !== undefined ? body.windSpeedMax : dataPoints[dataPoints.length - 1].windSpeed_mps;
      const step = body.windSpeedStep !== undefined ? body.windSpeedStep : 1.0;
      const range = validateCurveRange(minSpeed, maxSpeed, step);

      queryWindSpeeds = [];
      for (let v = range.minSpeed; v <= range.maxSpeed + 1e-9; v += range.step) {
        queryWindSpeeds.push(Math.round(v * 1000) / 1000);
      }
    }

    const curve = interpolateVerifiedPowerCurve({
      dataSource: body.dataSource.trim(),
      dataUnits: body.dataUnits || 'W',
      dataPoints,
      queryWindSpeeds
    });

    return sendJson(res, 200, {
      status: 'success',
      timestamp: new Date().toISOString(),
      ...curve
    });
  }

  // mode === 'educational_theoretical'
  const minSpeed = body.windSpeedMin !== undefined ? body.windSpeedMin : 0.0;
  const maxSpeed = body.windSpeedMax !== undefined ? body.windSpeedMax : 25.0;
  const step = body.windSpeedStep !== undefined ? body.windSpeedStep : 1.0;
  const range = validateCurveRange(minSpeed, maxSpeed, step);

  const baseline = TURBINE_MODEL_METADATA.educationalBaseline;
  const useEducationalAssumptions = Boolean(body.useEducationalAssumptions);

  let rotorRadius_m;
  if (body.rotorRadius_m !== undefined && body.rotorRadius_m !== null) {
    rotorRadius_m = validateRotorRadius(body.rotorRadius_m);
  } else if (body.rotorDiameter_m !== undefined && body.rotorDiameter_m !== null) {
    rotorRadius_m = validateRotorDiameter(body.rotorDiameter_m) / 2.0;
  } else if (body.bladeLength_m !== undefined && body.bladeLength_m !== null) {
    rotorRadius_m = validateBladeLength(body.bladeLength_m);
  } else if (useEducationalAssumptions) {
    rotorRadius_m = baseline.rotorRadius_m;
  } else {
    throw new ValidationError(
      'rotorRadius_m',
      'Rotor geometry is required for power curve calculation. Provide rotorRadius_m, rotorDiameter_m, bladeLength_m, or enable useEducationalAssumptions.'
    );
  }

  let airDensity_kgpm3 = STANDARD_AIR_DENSITY_KG_M3;
  if (body.airDensity_kgpm3 !== undefined && body.airDensity_kgpm3 !== null) {
    airDensity_kgpm3 = validateAirDensity(body.airDensity_kgpm3);
  } else if (useEducationalAssumptions) {
    airDensity_kgpm3 = baseline.airDensity_kgpm3;
  }

  let cp = null;
  if (body.cp !== undefined && body.cp !== null) {
    cp = validateCp(body.cp);
  } else if (useEducationalAssumptions) {
    cp = baseline.assumedCp;
  }

  let drivetrainEfficiency = null;
  let generatorEfficiency = null;
  if (body.drivetrainEfficiency !== undefined && body.drivetrainEfficiency !== null) {
    drivetrainEfficiency = validateEfficiency(body.drivetrainEfficiency, 'drivetrainEfficiency');
  } else if (useEducationalAssumptions) {
    drivetrainEfficiency = baseline.assumedDrivetrainEfficiency;
  }

  if (body.generatorEfficiency !== undefined && body.generatorEfficiency !== null) {
    generatorEfficiency = validateEfficiency(body.generatorEfficiency, 'generatorEfficiency');
  } else if (useEducationalAssumptions) {
    generatorEfficiency = baseline.assumedGeneratorEfficiency;
  }

  let cutInWindSpeed_mps = null;
  let ratedWindSpeed_mps = null;
  let cutOutWindSpeed_mps = null;
  let ratedElectricalPower_W = null;

  if (body.cutInWindSpeed_mps !== undefined && body.cutInWindSpeed_mps !== null) {
    cutInWindSpeed_mps = validateWindSpeed(body.cutInWindSpeed_mps, 'cutInWindSpeed_mps');
  }
  if (body.ratedWindSpeed_mps !== undefined && body.ratedWindSpeed_mps !== null) {
    ratedWindSpeed_mps = validateWindSpeed(body.ratedWindSpeed_mps, 'ratedWindSpeed_mps');
  }
  if (body.cutOutWindSpeed_mps !== undefined && body.cutOutWindSpeed_mps !== null) {
    cutOutWindSpeed_mps = validateWindSpeed(body.cutOutWindSpeed_mps, 'cutOutWindSpeed_mps');
  }
  if (body.ratedElectricalPower_W !== undefined && body.ratedElectricalPower_W !== null) {
    ratedElectricalPower_W = validateFiniteNumber(body.ratedElectricalPower_W, 'ratedElectricalPower_W', { min: 1, max: 1e8 });
  }

  const curve = generateEducationalPowerCurve({
    minSpeed_mps: range.minSpeed,
    maxSpeed_mps: range.maxSpeed,
    step_mps: range.step,
    rotorRadius_m,
    airDensity_kgpm3,
    cp,
    drivetrainEfficiency,
    generatorEfficiency,
    cutInWindSpeed_mps,
    ratedWindSpeed_mps,
    cutOutWindSpeed_mps,
    ratedElectricalPower_W
  });

  sendJson(res, 200, {
    status: 'success',
    timestamp: new Date().toISOString(),
    ...curve
  });
}

/**
 * Handles GET /api/weather/status
 */
function handleWeatherStatus(req, res) {
  const status = defaultWeatherService.getStatus();
  sendJson(res, 200, status);
}

/**
 * Handles GET /api/weather/current
 */
async function handleWeatherCurrent(req, res) {
  try {
    const weather = await defaultWeatherService.getCurrentWeather();
    sendJson(res, 200, weather);
  } catch (err) {
    if (err.details) {
      sendJson(res, 200, err.details);
    } else {
      sendJson(res, 503, {
        available: false,
        status: 'error',
        message: err.message,
        data: null
      });
    }
  }
}

/**
 * Main API request dispatcher.
 * Handles both standalone HTTP requests and Connect-style middleware (Vite).
 */
export async function apiMiddleware(req, res, next) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.end();
  }

  const parsedUrl = new URL(req.url, 'http://localhost');
  const pathname = (parsedUrl.pathname || '').replace(/\/+$/, '') || '/';

  // If path is not an /api route, pass through to next middleware (for Vite)
  if (!pathname.startsWith('/api')) {
    if (typeof next === 'function') {
      return next();
    }
    return sendJson(res, 404, {
      status: 'error',
      error: 'Not Found',
      message: `The path ${pathname} was not found on this server.`
    });
  }

  try {
    // Route matching
    if (pathname === '/api/health') {
      if (req.method !== 'GET') {
        return sendJson(res, 405, { status: 'error', error: 'Method Not Allowed', message: 'Use GET for /api/health.' });
      }
      return handleHealth(req, res);
    }

    if (pathname === '/api/simulation/model') {
      if (req.method !== 'GET') {
        return sendJson(res, 405, { status: 'error', error: 'Method Not Allowed', message: 'Use GET for /api/simulation/model.' });
      }
      return handleSimulationModel(req, res);
    }

    if (pathname === '/api/simulation/calculate') {
      if (req.method !== 'POST') {
        return sendJson(res, 405, { status: 'error', error: 'Method Not Allowed', message: 'Use POST for /api/simulation/calculate.' });
      }
      return await handleSimulationCalculate(req, res);
    }

    if (pathname === '/api/simulation/power-curve') {
      if (req.method !== 'POST') {
        return sendJson(res, 405, { status: 'error', error: 'Method Not Allowed', message: 'Use POST for /api/simulation/power-curve.' });
      }
      return await handleSimulationPowerCurve(req, res);
    }

    if (pathname === '/api/weather/status') {
      if (req.method !== 'GET') {
        return sendJson(res, 405, { status: 'error', error: 'Method Not Allowed', message: 'Use GET for /api/weather/status.' });
      }
      return handleWeatherStatus(req, res);
    }

    if (pathname === '/api/weather/current') {
      if (req.method !== 'GET') {
        return sendJson(res, 405, { status: 'error', error: 'Method Not Allowed', message: 'Use GET for /api/weather/current.' });
      }
      return await handleWeatherCurrent(req, res);
    }

    // Unmatched API endpoint
    return sendJson(res, 404, {
      status: 'error',
      error: 'Endpoint Not Found',
      message: `API route '${pathname}' is not recognized.`
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return sendJson(res, error.statusCode, {
        status: 'error',
        error: 'Validation Error',
        field: error.field,
        message: error.message
      });
    }

    return sendJson(res, 500, {
      status: 'error',
      error: 'Internal Server Error',
      message: error.message || 'An unexpected calculation error occurred.'
    });
  }
}
