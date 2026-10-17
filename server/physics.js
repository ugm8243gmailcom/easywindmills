/**
 * EasyWindmill - HAWT Simulation Physics Calculation Engine
 *
 * All internal calculations use standard International System of Units (SI):
 * - Length: metres (m)
 * - Area: square metres (m^2)
 * - Velocity: metres per second (m/s)
 * - Density: kilograms per cubic metre (kg/m^3)
 * - Angular velocity: radians per second (rad/s)
 * - Rotational speed: revolutions per minute (RPM)
 * - Power: watts (W)
 * - Torque: newton-metres (N*m)
 */

import { BETZ_LIMIT, STANDARD_AIR_DENSITY_KG_M3 } from './constants.js';

/**
 * Calculates rotor geometry for a conventional 3-bladed horizontal-axis wind turbine.
 *
 * Equations:
 *   D = 2 * R
 *   A = pi * R^2
 *
 * Blade length assumption:
 * When blade length is provided in place of rotor radius, it is assumed to approximate
 * the distance from the rotor hub rotational axis to the blade tip.
 */
export function calculateRotorGeometry({ rotorRadius_m, rotorDiameter_m, bladeLength_m }) {
  let radius = null;
  let geometryAssumption = null;

  if (typeof rotorRadius_m === 'number' && rotorRadius_m > 0) {
    radius = rotorRadius_m;
    geometryAssumption = 'Rotor radius explicitly specified as radial distance from rotational axis to blade tip.';
  } else if (typeof rotorDiameter_m === 'number' && rotorDiameter_m > 0) {
    radius = rotorDiameter_m / 2.0;
    geometryAssumption = 'Rotor radius derived from specified rotor diameter (R = D / 2).';
  } else if (typeof bladeLength_m === 'number' && bladeLength_m > 0) {
    radius = bladeLength_m;
    geometryAssumption = 'Blade length approximates rotor radius assuming radial distance from rotor axis to blade tip, neglecting hub center offset.';
  } else {
    throw new Error('Either rotorRadius_m, rotorDiameter_m, or bladeLength_m must be provided.');
  }

  const diameter = 2.0 * radius;
  const sweptArea = Math.PI * Math.pow(radius, 2);

  return {
    rotorRadius_m: radius,
    rotorDiameter_m: diameter,
    sweptArea_m2: sweptArea,
    bladeCount: 3,
    geometryAssumption
  };
}

/**
 * Calculates kinetic power available in the wind passing through the swept area.
 *
 * Equation:
 *   P_wind = 0.5 * rho * A * v^3
 *
 * Boundary condition:
 *   v = 0 => P_wind = 0 W
 */
export function calculateAvailableWindPower(sweptArea_m2, windSpeed_mps, airDensity_kgpm3 = STANDARD_AIR_DENSITY_KG_M3) {
  if (windSpeed_mps === 0) {
    return 0.0;
  }
  return 0.5 * airDensity_kgpm3 * sweptArea_m2 * Math.pow(windSpeed_mps, 3);
}

/**
 * Calculates captured mechanical power from available wind power and power coefficient.
 *
 * Equation:
 *   P_mech = P_wind * Cp
 *
 * Constraints:
 *   0 <= Cp <= Betz Limit (~0.5926)
 */
export function calculateMechanicalPower(availableWindPower_W, cp) {
  if (cp === null || cp === undefined) {
    return null;
  }
  if (cp < 0 || cp > (BETZ_LIMIT + 1e-6)) {
    throw new Error(`Aerodynamic power coefficient Cp (${cp}) must be between 0 and the Betz limit (${BETZ_LIMIT.toFixed(4)}).`);
  }
  return availableWindPower_W * cp;
}

/**
 * Calculates estimated electrical power output from captured mechanical power.
 *
 * Equation:
 *   P_electrical = P_mech * eta_drivetrain * eta_generator
 *
 * If efficiencies are not provided, electrical power cannot be reliably estimated.
 */
export function calculateElectricalPower(mechanicalPower_W, drivetrainEfficiency, generatorEfficiency) {
  if (mechanicalPower_W === null || mechanicalPower_W === undefined) {
    return {
      electricalPower_W: null,
      status: 'unavailable',
      reason: 'Mechanical power is unavailable.'
    };
  }

  if (drivetrainEfficiency === null || drivetrainEfficiency === undefined ||
      generatorEfficiency === null || generatorEfficiency === undefined) {
    return {
      electricalPower_W: null,
      status: 'unavailable',
      reason: 'Drivetrain and generator efficiency parameters are not verified and were not supplied in request.'
    };
  }

  const combinedEfficiency = drivetrainEfficiency * generatorEfficiency;
  const electricalPower_W = mechanicalPower_W * combinedEfficiency;
  const drivetrainLoss_W = mechanicalPower_W * (1.0 - drivetrainEfficiency);
  const generatorLoss_W = (mechanicalPower_W * drivetrainEfficiency) * (1.0 - generatorEfficiency);

  return {
    electricalPower_W,
    status: 'calculated',
    drivetrainEfficiency,
    generatorEfficiency,
    combinedEfficiency,
    losses: {
      drivetrainLoss_W,
      generatorLoss_W,
      totalLoss_W: drivetrainLoss_W + generatorLoss_W
    }
  };
}

/**
 * Calculates rotor rotational speed, tip-speed ratio, and mechanical torque.
 *
 * Equations:
 *   omega = lambda_target * v / R (operating point estimate for variable-speed rotor)
 *   RPM = omega * 60 / (2 * pi)
 *   v_tip = omega * R
 *   actual_lambda = omega * R / v (for v > 0)
 *   tau = P_mech / omega (for omega > 0)
 *
 * Boundary condition handling:
 *   At v = 0: omega = 0, RPM = 0, v_tip = 0, lambda = 0, tau = 0 N*m.
 *   If omega = 0 and P_mech > 0: division by zero is safely guarded; torque marked unavailable.
 */
export function calculateRotorDynamics({
  windSpeed_mps,
  rotorRadius_m,
  mechanicalPower_W,
  targetTipSpeedRatio,
  maxRotorRPM,
  maxTipSpeed_mps
}) {
  if (windSpeed_mps === 0) {
    return {
      angularVelocity_radps: 0.0,
      rotorRPM: 0.0,
      tipSpeed_mps: 0.0,
      tipSpeedRatio: 0.0,
      aerodynamicTorque_Nm: 0.0,
      isRPMClamped: false,
      notes: 'Rotor is stationary at zero wind speed. Aerodynamic torque is zero.'
    };
  }

  if (targetTipSpeedRatio === null || targetTipSpeedRatio === undefined) {
    return {
      angularVelocity_radps: null,
      rotorRPM: null,
      tipSpeed_mps: null,
      tipSpeedRatio: null,
      aerodynamicTorque_Nm: null,
      status: 'unavailable',
      reason: 'Target tip-speed ratio was not supplied; rotor rotational speed cannot be estimated without an operating-point speed model.'
    };
  }

  // Unconstrained operational angular velocity
  let omega = (targetTipSpeedRatio * windSpeed_mps) / rotorRadius_m;
  let isRPMClamped = false;

  // Apply maximum RPM limit if supplied
  if (typeof maxRotorRPM === 'number' && maxRotorRPM > 0) {
    const maxOmega = (maxRotorRPM * 2.0 * Math.PI) / 60.0;
    if (omega > maxOmega) {
      omega = maxOmega;
      isRPMClamped = true;
    }
  }

  // Apply maximum tip-speed limit if supplied
  if (typeof maxTipSpeed_mps === 'number' && maxTipSpeed_mps > 0) {
    const tipOmega = maxTipSpeed_mps / rotorRadius_m;
    if (omega > tipOmega) {
      omega = tipOmega;
      isRPMClamped = true;
    }
  }

  const rotorRPM = (omega * 60.0) / (2.0 * Math.PI);
  const tipSpeed_mps = omega * rotorRadius_m;
  const tipSpeedRatio = tipSpeed_mps / windSpeed_mps;

  // Mechanical torque on low-speed shaft: tau = P_mech / omega
  let aerodynamicTorque_Nm = null;
  if (mechanicalPower_W !== null && mechanicalPower_W !== undefined) {
    if (omega > 0) {
      aerodynamicTorque_Nm = mechanicalPower_W / omega;
    } else if (mechanicalPower_W === 0) {
      aerodynamicTorque_Nm = 0.0;
    } else {
      aerodynamicTorque_Nm = null;
    }
  }

  return {
    angularVelocity_radps: omega,
    rotorRPM,
    tipSpeed_mps,
    tipSpeedRatio,
    aerodynamicTorque_Nm,
    isRPMClamped,
    notes: 'Operating point estimate derived from target tip-speed ratio. Does not model rotor inertia or pitch dynamics.'
  };
}

/**
 * Calculates gearbox output shaft speed (generator shaft speed) and torque.
 *
 * Ratio definition:
 *   gearboxRatio = generator shaft speed / rotor shaft speed
 *   omega_gen = omega_rotor * gearboxRatio
 *   RPM_gen = RPM_rotor * gearboxRatio
 */
export function calculateGearboxOutput({
  rotorAngularVelocity_radps,
  rotorRPM,
  aerodynamicTorque_Nm,
  gearboxRatio,
  gearboxEfficiency
}) {
  if (gearboxRatio === null || gearboxRatio === undefined) {
    return {
      generatorShaftAngularVelocity_radps: null,
      generatorShaftRPM: null,
      generatorShaftTorque_Nm: null,
      gearboxRatio: null,
      status: 'unavailable',
      reason: 'Gearbox step-up ratio is unverified and was not supplied.'
    };
  }

  if (rotorRPM === null || rotorRPM === undefined) {
    return {
      generatorShaftAngularVelocity_radps: null,
      generatorShaftRPM: null,
      generatorShaftTorque_Nm: null,
      gearboxRatio,
      status: 'unavailable',
      reason: 'Rotor rotational speed is unavailable.'
    };
  }

  const generatorShaftAngularVelocity_radps = rotorAngularVelocity_radps * gearboxRatio;
  const generatorShaftRPM = rotorRPM * gearboxRatio;

  let generatorShaftTorque_Nm = null;
  if (aerodynamicTorque_Nm !== null && aerodynamicTorque_Nm !== undefined) {
    const eff = typeof gearboxEfficiency === 'number' ? gearboxEfficiency : 1.0;
    generatorShaftTorque_Nm = (aerodynamicTorque_Nm * eff) / gearboxRatio;
  }

  return {
    generatorShaftAngularVelocity_radps,
    generatorShaftRPM,
    generatorShaftTorque_Nm,
    gearboxRatio,
    definition: 'Gearbox ratio is defined as generator-side speed divided by rotor-side speed (speed step-up).',
    status: 'calculated'
  };
}

/**
 * Generates an educational theoretical power curve sampled over a range of wind speeds.
 *
 * Supports optional verified operating limits (cut-in, rated, cut-out).
 * When operating limits are missing, the curve is marked as lacking validated limits
 * and does not fabricate shutdown behavior.
 */
export function generateEducationalPowerCurve({
  minSpeed_mps = 0.0,
  maxSpeed_mps = 25.0,
  step_mps = 1.0,
  rotorRadius_m,
  airDensity_kgpm3 = STANDARD_AIR_DENSITY_KG_M3,
  cp,
  drivetrainEfficiency,
  generatorEfficiency,
  cutInWindSpeed_mps,
  ratedWindSpeed_mps,
  cutOutWindSpeed_mps,
  ratedElectricalPower_W
}) {
  const geometry = calculateRotorGeometry({ rotorRadius_m });
  const points = [];

  const hasOperatingLimits = (
    typeof cutInWindSpeed_mps === 'number' &&
    typeof ratedWindSpeed_mps === 'number' &&
    typeof cutOutWindSpeed_mps === 'number' &&
    typeof ratedElectricalPower_W === 'number'
  );

  for (let v = minSpeed_mps; v <= maxSpeed_mps + 1e-9; v += step_mps) {
    const windSpeed = Math.round(v * 1000) / 1000;
    const pWind = calculateAvailableWindPower(geometry.sweptArea_m2, windSpeed, airDensity_kgpm3);
    let pMech = calculateMechanicalPower(pWind, cp);
    let pElecCalc = calculateElectricalPower(pMech, drivetrainEfficiency, generatorEfficiency);
    let pElec = pElecCalc.electricalPower_W;
    let operatingState = 'unconstrained_theoretical';

    if (hasOperatingLimits) {
      if (windSpeed < cutInWindSpeed_mps) {
        pMech = 0.0;
        pElec = 0.0;
        operatingState = 'below_cut_in_parked';
      } else if (windSpeed >= cutInWindSpeed_mps && windSpeed < ratedWindSpeed_mps) {
        operatingState = 'region_2_partial_load';
      } else if (windSpeed >= ratedWindSpeed_mps && windSpeed <= cutOutWindSpeed_mps) {
        // Full load / pitch regulation: power capped at rated power
        if (pElec !== null) {
          pElec = Math.min(pElec, ratedElectricalPower_W);
        }
        operatingState = 'region_3_rated_power';
      } else if (windSpeed > cutOutWindSpeed_mps) {
        pMech = 0.0;
        pElec = 0.0;
        operatingState = 'above_cut_out_shutdown';
      }
    }

    points.push({
      windSpeed_mps: windSpeed,
      availableWindPower_W: pWind,
      mechanicalPower_W: pMech,
      electricalPower_W: pElec,
      operatingState
    });
  }

  return {
    mode: 'educational_theoretical',
    rotorGeometry: geometry,
    airDensity_kgpm3,
    cp,
    operatingLimitsApplied: hasOperatingLimits,
    operatingLimits: hasOperatingLimits ? {
      cutInWindSpeed_mps,
      ratedWindSpeed_mps,
      cutOutWindSpeed_mps,
      ratedElectricalPower_W
    } : null,
    limitationsNotice: hasOperatingLimits
      ? 'Operating limits applied based on supplied parameters.'
      : 'No validated cut-in, rated, or cut-out wind speed limits were supplied. Power values reflect unconstrained theoretical aerodynamic scaling without blade pitch feathering or aerodynamic stall shutdown.',
    points
  };
}

/**
 * Evaluates power values from verified turbine data points using piecewise linear interpolation.
 *
 * Rules:
 *   - Interpolation only within the min and max wind speed domain of the supplied dataset.
 *   - NEVER extrapolates silently. Queries outside data domain return status: 'out_of_range'.
 */
export function interpolateVerifiedPowerCurve({
  dataSource,
  dataUnits = 'W',
  dataPoints,
  queryWindSpeeds
}) {
  if (!dataSource || typeof dataSource !== 'string') {
    throw new Error('Verified turbine power curve requires a documented dataSource citation.');
  }

  const vMin = dataPoints[0].windSpeed_mps;
  const vMax = dataPoints[dataPoints.length - 1].windSpeed_mps;

  // Convert power to Watts if supplied in kW
  const unitFactor = dataUnits.toLowerCase() === 'kw' ? 1000.0 : 1.0;

  const results = queryWindSpeeds.map(qSpeed => {
    const v = Math.round(qSpeed * 1000) / 1000;

    if (v < vMin || v > vMax) {
      return {
        windSpeed_mps: v,
        electricalPower_W: null,
        status: 'out_of_range',
        reason: `Wind speed ${v} m/s is outside the verified data domain [${vMin}, ${vMax}] m/s. Extrapolation is strictly disabled.`
      };
    }

    // Exact match
    const exact = dataPoints.find(p => Math.abs(p.windSpeed_mps - v) < 1e-6);
    if (exact) {
      return {
        windSpeed_mps: v,
        electricalPower_W: exact.power * unitFactor,
        status: 'exact_point'
      };
    }

    // Find bounding segment for piecewise linear interpolation
    let lower = dataPoints[0];
    let upper = dataPoints[dataPoints.length - 1];

    for (let i = 0; i < dataPoints.length - 1; i++) {
      if (v >= dataPoints[i].windSpeed_mps && v <= dataPoints[i + 1].windSpeed_mps) {
        lower = dataPoints[i];
        upper = dataPoints[i + 1];
        break;
      }
    }

    const t = (v - lower.windSpeed_mps) / (upper.windSpeed_mps - lower.windSpeed_mps);
    const interpolatedPower_W = (lower.power + t * (upper.power - lower.power)) * unitFactor;

    return {
      windSpeed_mps: v,
      electricalPower_W: interpolatedPower_W,
      status: 'interpolated',
      boundingSegment_mps: [lower.windSpeed_mps, upper.windSpeed_mps]
    };
  });

  return {
    mode: 'verified_turbine_curve',
    dataSource,
    dataUnits: 'W',
    interpolationMethod: 'piecewise_linear',
    validDomain_mps: [vMin, vMax],
    points: results
  };
}
