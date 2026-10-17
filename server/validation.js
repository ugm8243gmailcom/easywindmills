/**
 * EasyWindmill - Rigid Input Validation Module
 *
 * Ensures all physics calculations are performed on mathematically well-defined,
 * physically defensible, and finite numerical values.
 */

import { BETZ_LIMIT } from './constants.js';

export class ValidationError extends Error {
  constructor(field, message) {
    super(`${field}: ${message}`);
    this.name = 'ValidationError';
    this.field = field;
    this.statusCode = 400;
  }
}

/**
 * Validates that a value is a finite number within specified bounds.
 * Rejects NaN, Infinity, -Infinity, strings, null, undefined, and out-of-bound numbers.
 */
export function validateFiniteNumber(value, fieldName, { min = -Infinity, max = Infinity, allowZero = true } = {}) {
  if (value === undefined || value === null) {
    throw new ValidationError(fieldName, 'Value is required and cannot be null or undefined.');
  }

  if (typeof value !== 'number' || !Number.isFinite(value) || Number.isNaN(value)) {
    throw new ValidationError(fieldName, `Expected a finite number, received ${typeof value === 'number' ? String(value) : typeof value}.`);
  }

  if (!allowZero && value === 0) {
    throw new ValidationError(fieldName, 'Value cannot be zero.');
  }

  if (value < min) {
    throw new ValidationError(fieldName, `Value ${value} is below the minimum allowed bound of ${min}.`);
  }

  if (value > max) {
    throw new ValidationError(fieldName, `Value ${value} exceeds the maximum allowed bound of ${max}.`);
  }

  return value;
}

/**
 * Validates wind speed in m/s.
 * Must be non-negative (zero wind is legitimate and supported).
 */
export function validateWindSpeed(windSpeed, fieldName = 'windSpeed_mps') {
  return validateFiniteNumber(windSpeed, fieldName, { min: 0, max: 120, allowZero: true });
}

/**
 * Validates rotor radius in metres.
 * Must be strictly positive.
 */
export function validateRotorRadius(radius, fieldName = 'rotorRadius_m') {
  return validateFiniteNumber(radius, fieldName, { min: 0.1, max: 200, allowZero: false });
}

/**
 * Validates rotor diameter in metres.
 * Must be strictly positive.
 */
export function validateRotorDiameter(diameter, fieldName = 'rotorDiameter_m') {
  return validateFiniteNumber(diameter, fieldName, { min: 0.2, max: 400, allowZero: false });
}

/**
 * Validates blade length in metres.
 * Must be strictly positive.
 */
export function validateBladeLength(bladeLength, fieldName = 'bladeLength_m') {
  return validateFiniteNumber(bladeLength, fieldName, { min: 0.1, max: 200, allowZero: false });
}

/**
 * Validates ambient air density in kg/m^3.
 * Atmospheric air density near Earth surface typically ranges 0.5 to 1.8 kg/m^3.
 */
export function validateAirDensity(airDensity, fieldName = 'airDensity_kgpm3') {
  return validateFiniteNumber(airDensity, fieldName, { min: 0.1, max: 5.0, allowZero: false });
}

/**
 * Validates aerodynamic power coefficient (Cp).
 * Must be between 0 and the theoretical Betz limit (16/27 ~ 0.5926).
 */
export function validateCp(cp, fieldName = 'cp') {
  // Allow a tiny epsilon (1e-6) for floating-point 16/27 comparisons
  const maxAllowed = BETZ_LIMIT + 1e-6;
  if (typeof cp !== 'number' || !Number.isFinite(cp) || Number.isNaN(cp)) {
    throw new ValidationError(fieldName, 'Expected a finite number between 0 and the Betz limit (approx 0.5926).');
  }
  if (cp < 0) {
    throw new ValidationError(fieldName, `Aerodynamic power coefficient Cp (${cp}) cannot be negative.`);
  }
  if (cp > maxAllowed) {
    throw new ValidationError(fieldName, `Aerodynamic power coefficient Cp (${cp.toFixed(4)}) exceeds the theoretical Betz limit (${BETZ_LIMIT.toFixed(4)}).`);
  }
  return cp;
}

/**
 * Validates electromechanical efficiency (0 to 1).
 */
export function validateEfficiency(efficiency, fieldName) {
  return validateFiniteNumber(efficiency, fieldName, { min: 0.0, max: 1.0, allowZero: true });
}

/**
 * Validates gearbox speed step-up ratio (generator speed / rotor speed).
 * For speed-increasing gearboxes, ratio must be strictly positive.
 */
export function validateGearboxRatio(ratio, fieldName = 'gearboxRatio') {
  return validateFiniteNumber(ratio, fieldName, { min: 0.1, max: 1000.0, allowZero: false });
}

/**
 * Validates target tip-speed ratio (TSR, lambda).
 */
export function validateTipSpeedRatio(tsr, fieldName = 'targetTipSpeedRatio') {
  return validateFiniteNumber(tsr, fieldName, { min: 0.1, max: 30.0, allowZero: false });
}

/**
 * Validates maximum rotor speed constraint (RPM).
 */
export function validateMaxRPM(rpm, fieldName = 'maxRotorRPM') {
  return validateFiniteNumber(rpm, fieldName, { min: 0.1, max: 500.0, allowZero: false });
}

/**
 * Validates power curve sampling bounds.
 */
export function validateCurveRange(minSpeed, maxSpeed, step) {
  validateFiniteNumber(minSpeed, 'windSpeedMin', { min: 0, max: 100, allowZero: true });
  validateFiniteNumber(maxSpeed, 'windSpeedMax', { min: 0.1, max: 120, allowZero: false });
  validateFiniteNumber(step, 'windSpeedStep', { min: 0.01, max: 10, allowZero: false });

  if (maxSpeed <= minSpeed) {
    throw new ValidationError('windSpeedMax', `Maximum wind speed (${maxSpeed}) must be strictly greater than minimum wind speed (${minSpeed}).`);
  }

  const pointCount = Math.floor((maxSpeed - minSpeed) / step) + 1;
  if (pointCount > 2000) {
    throw new ValidationError('windSpeedStep', `Sampling step yields ${pointCount} points, exceeding maximum limit of 2000 points.`);
  }

  return { minSpeed, maxSpeed, step, pointCount };
}

/**
 * Validates verified turbine data points for power curve interpolation.
 */
export function validateVerifiedCurveData(dataPoints, fieldName = 'dataPoints') {
  if (!Array.isArray(dataPoints) || dataPoints.length < 2) {
    throw new ValidationError(fieldName, 'Verified power curve requires an array of at least 2 data points.');
  }

  for (let i = 0; i < dataPoints.length; i++) {
    const pt = dataPoints[i];
    if (!pt || typeof pt !== 'object') {
      throw new ValidationError(`${fieldName}[${i}]`, 'Each data point must be an object with windSpeed_mps and power.');
    }
    validateFiniteNumber(pt.windSpeed_mps, `${fieldName}[${i}].windSpeed_mps`, { min: 0, max: 120, allowZero: true });
    validateFiniteNumber(pt.power, `${fieldName}[${i}].power`, { min: 0, max: 1e8, allowZero: true });

    if (i > 0 && pt.windSpeed_mps <= dataPoints[i - 1].windSpeed_mps) {
      throw new ValidationError(
        `${fieldName}[${i}].windSpeed_mps`,
        `Data points must be sorted in strictly ascending wind speed order without duplicates (${pt.windSpeed_mps} <= ${dataPoints[i - 1].windSpeed_mps}).`
      );
    }
  }

  return dataPoints;
}
