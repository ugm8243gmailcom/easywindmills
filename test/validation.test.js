/**
 * EasyWindmill - Input Validation Unit Tests
 * Ensures rigid rejection of unphysical, non-finite, and malformed inputs.
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  ValidationError,
  validateFiniteNumber,
  validateWindSpeed,
  validateRotorRadius,
  validateAirDensity,
  validateCp,
  validateEfficiency,
  validateGearboxRatio,
  validateCurveRange,
  validateVerifiedCurveData
} from '../server/validation.js';
import { BETZ_LIMIT } from '../server/constants.js';

describe('Finite Number Validation', () => {
  test('Accepts valid finite numbers within bounds', () => {
    assert.strictEqual(validateFiniteNumber(42, 'field', { min: 0, max: 100 }), 42);
    assert.strictEqual(validateFiniteNumber(0, 'field', { min: 0, max: 100, allowZero: true }), 0);
  });

  test('Rejects NaN, Infinity, -Infinity, strings, and null', () => {
    assert.throws(() => validateFiniteNumber(NaN, 'field'), ValidationError);
    assert.throws(() => validateFiniteNumber(Infinity, 'field'), ValidationError);
    assert.throws(() => validateFiniteNumber(-Infinity, 'field'), ValidationError);
    assert.throws(() => validateFiniteNumber('10', 'field'), ValidationError);
    assert.throws(() => validateFiniteNumber(null, 'field'), ValidationError);
    assert.throws(() => validateFiniteNumber(undefined, 'field'), ValidationError);
  });
});

describe('Wind Speed Validation', () => {
  test('Accepts positive wind speed and legitimate zero wind', () => {
    assert.strictEqual(validateWindSpeed(12.5), 12.5);
    assert.strictEqual(validateWindSpeed(0), 0);
  });

  test('Rejects negative wind speeds', () => {
    assert.throws(() => validateWindSpeed(-0.1), ValidationError);
    assert.throws(() => validateWindSpeed(-15.0), ValidationError);
  });
});

describe('Rotor Geometry Validation', () => {
  test('Accepts positive rotor radius', () => {
    assert.strictEqual(validateRotorRadius(40.0), 40.0);
  });

  test('Rejects zero and negative rotor radius', () => {
    assert.throws(() => validateRotorRadius(0), ValidationError);
    assert.throws(() => validateRotorRadius(-10), ValidationError);
  });
});

describe('Air Density Validation', () => {
  test('Accepts reasonable air density', () => {
    assert.strictEqual(validateAirDensity(1.225), 1.225);
  });

  test('Rejects unphysical or zero air density', () => {
    assert.throws(() => validateAirDensity(0), ValidationError);
    assert.throws(() => validateAirDensity(-1.2), ValidationError);
    assert.throws(() => validateAirDensity(10.0), ValidationError); // > 5.0 kg/m^3
  });
});

describe('Power Coefficient (Cp) Validation', () => {
  test('Accepts valid Cp between 0 and Betz limit', () => {
    assert.strictEqual(validateCp(0.42), 0.42);
    assert.strictEqual(validateCp(0.0), 0.0);
    assert.ok(Math.abs(validateCp(BETZ_LIMIT) - BETZ_LIMIT) < 1e-12);
  });

  test('Rejects Cp greater than the theoretical Betz limit (0.5926)', () => {
    assert.throws(() => validateCp(0.595), ValidationError);
    assert.throws(() => validateCp(0.85), ValidationError);
    assert.throws(() => validateCp(1.0), ValidationError);
  });

  test('Rejects negative Cp', () => {
    assert.throws(() => validateCp(-0.1), ValidationError);
  });
});

describe('Efficiency Validation', () => {
  test('Accepts efficiencies between 0.0 and 1.0', () => {
    assert.strictEqual(validateEfficiency(0.95, 'drivetrain'), 0.95);
    assert.strictEqual(validateEfficiency(1.0, 'drivetrain'), 1.0);
    assert.strictEqual(validateEfficiency(0.0, 'drivetrain'), 0.0);
  });

  test('Rejects efficiencies out of range', () => {
    assert.throws(() => validateEfficiency(-0.01, 'eff'), ValidationError);
    assert.throws(() => validateEfficiency(1.05, 'eff'), ValidationError);
    assert.throws(() => validateEfficiency(95, 'eff'), ValidationError); // User passed percentage instead of fraction
  });
});

describe('Gearbox Ratio Validation', () => {
  test('Accepts positive gearbox ratio', () => {
    assert.strictEqual(validateGearboxRatio(90.0), 90.0);
  });

  test('Rejects zero or negative gearbox ratio', () => {
    assert.throws(() => validateGearboxRatio(0), ValidationError);
    assert.throws(() => validateGearboxRatio(-90), ValidationError);
  });
});

describe('Power Curve Range and Verified Data Validation', () => {
  test('Validates curve range bounds', () => {
    const range = validateCurveRange(0, 25, 1);
    assert.strictEqual(range.minSpeed, 0);
    assert.strictEqual(range.maxSpeed, 25);
    assert.strictEqual(range.step, 1);
  });

  test('Rejects reversed or negative curve ranges', () => {
    assert.throws(() => validateCurveRange(25, 10, 1), ValidationError);
    assert.throws(() => validateCurveRange(10, 10, 1), ValidationError);
    assert.throws(() => validateCurveRange(0, 25, 0), ValidationError);
    assert.throws(() => validateCurveRange(0, 25, -1), ValidationError);
  });

  test('Rejects verified curve datasets with fewer than 2 points or unsorted points', () => {
    assert.throws(() => validateVerifiedCurveData([]), ValidationError);
    assert.throws(() => validateVerifiedCurveData([{ windSpeed_mps: 5, power: 100 }]), ValidationError);

    // Unsorted
    assert.throws(() => validateVerifiedCurveData([
      { windSpeed_mps: 10, power: 1000 },
      { windSpeed_mps: 5, power: 200 }
    ]), ValidationError);

    // Duplicate wind speed
    assert.throws(() => validateVerifiedCurveData([
      { windSpeed_mps: 5, power: 200 },
      { windSpeed_mps: 5, power: 250 }
    ]), ValidationError);
  });
});
