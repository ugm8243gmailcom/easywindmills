/**
 * EasyWindmill - Power Curve Generation and Interpolation Tests
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  generateEducationalPowerCurve,
  interpolateVerifiedPowerCurve
} from '../server/physics.js';

describe('Educational Theoretical Power Curve', () => {
  test('Generates sampled curve points without operating limits', () => {
    const curve = generateEducationalPowerCurve({
      minSpeed_mps: 0.0,
      maxSpeed_mps: 20.0,
      step_mps: 2.0,
      rotorRadius_m: 40.0,
      cp: 0.42,
      drivetrainEfficiency: 0.95,
      generatorEfficiency: 0.94
    });

    assert.strictEqual(curve.mode, 'educational_theoretical');
    assert.strictEqual(curve.operatingLimitsApplied, false);
    assert.ok(curve.limitationsNotice.includes('No validated cut-in, rated, or cut-out wind speed limits were supplied'));

    // Check points count: 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20 => 11 points
    assert.strictEqual(curve.points.length, 11);

    // v = 0 m/s => 0 W
    assert.strictEqual(curve.points[0].windSpeed_mps, 0);
    assert.strictEqual(curve.points[0].availableWindPower_W, 0);
    assert.strictEqual(curve.points[0].electricalPower_W, 0);

    // v = 10 m/s
    const p10 = curve.points.find(p => p.windSpeed_mps === 10);
    assert.ok(p10);
    assert.ok(p10.electricalPower_W > 1000000); // > 1 MW
    assert.strictEqual(p10.operatingState, 'unconstrained_theoretical');
  });

  test('Applies operating limits strictly when supplied', () => {
    const curve = generateEducationalPowerCurve({
      minSpeed_mps: 0.0,
      maxSpeed_mps: 30.0,
      step_mps: 1.0,
      rotorRadius_m: 40.0,
      cp: 0.42,
      drivetrainEfficiency: 0.95,
      generatorEfficiency: 0.94,
      cutInWindSpeed_mps: 3.0,
      ratedWindSpeed_mps: 11.5,
      cutOutWindSpeed_mps: 25.0,
      ratedElectricalPower_W: 2000000.0 // 2 MW
    });

    assert.strictEqual(curve.operatingLimitsApplied, true);

    // Below cut-in (v = 2 m/s): parked / zero mechanical & electrical power
    const p2 = curve.points.find(p => p.windSpeed_mps === 2);
    assert.strictEqual(p2.mechanicalPower_W, 0.0);
    assert.strictEqual(p2.electricalPower_W, 0.0);
    assert.strictEqual(p2.operatingState, 'below_cut_in_parked');

    // Region 2 (v = 8 m/s): partial load operation
    const p8 = curve.points.find(p => p.windSpeed_mps === 8);
    assert.ok(p8.electricalPower_W > 0);
    assert.ok(p8.electricalPower_W < 2000000.0);
    assert.strictEqual(p8.operatingState, 'region_2_partial_load');

    // Region 3 (v = 15 m/s): full load / pitch regulated cap
    const p15 = curve.points.find(p => p.windSpeed_mps === 15);
    assert.strictEqual(p15.electricalPower_W, 2000000.0);
    assert.strictEqual(p15.operatingState, 'region_3_rated_power');

    // Above cut-out (v = 26 m/s): feathered shutdown
    const p26 = curve.points.find(p => p.windSpeed_mps === 26);
    assert.strictEqual(p26.mechanicalPower_W, 0.0);
    assert.strictEqual(p26.electricalPower_W, 0.0);
    assert.strictEqual(p26.operatingState, 'above_cut_out_shutdown');
  });
});

describe('Verified Turbine Power Curve Piecewise Linear Interpolation', () => {
  const verifiedData = [
    { windSpeed_mps: 3.0, power: 0.0 },
    { windSpeed_mps: 6.0, power: 300.0 }, // kW
    { windSpeed_mps: 9.0, power: 1200.0 }, // kW
    { windSpeed_mps: 12.0, power: 2000.0 }  // kW
  ];

  test('Requires documented data source', () => {
    assert.throws(() => {
      interpolateVerifiedPowerCurve({
        dataSource: '',
        dataPoints: verifiedData,
        queryWindSpeeds: [6.0]
      });
    }, /requires a documented dataSource citation/);
  });

  test('Interpolates accurately within valid domain', () => {
    const result = interpolateVerifiedPowerCurve({
      dataSource: 'Turbine OEM Specification Sheet Rev 4.2',
      dataUnits: 'kW',
      dataPoints: verifiedData,
      queryWindSpeeds: [3.0, 6.0, 7.5, 9.0, 10.5, 12.0]
    });

    assert.strictEqual(result.mode, 'verified_turbine_curve');
    assert.strictEqual(result.interpolationMethod, 'piecewise_linear');
    assert.deepStrictEqual(result.validDomain_mps, [3.0, 12.0]);

    // Exact point: v = 6.0 m/s => 300 kW => 300,000 W
    const pt6 = result.points.find(p => p.windSpeed_mps === 6.0);
    assert.strictEqual(pt6.status, 'exact_point');
    assert.strictEqual(pt6.electricalPower_W, 300000.0);

    // Midpoint: v = 7.5 m/s (halfway between 6.0 and 9.0)
    // Power = 300 + 0.5 * (1200 - 300) = 750 kW => 750,000 W
    const pt7_5 = result.points.find(p => p.windSpeed_mps === 7.5);
    assert.strictEqual(pt7_5.status, 'interpolated');
    assert.strictEqual(pt7_5.electricalPower_W, 750000.0);
  });

  test('Rejects out-of-domain queries without silent extrapolation', () => {
    const result = interpolateVerifiedPowerCurve({
      dataSource: 'Turbine OEM Specification Sheet Rev 4.2',
      dataUnits: 'kW',
      dataPoints: verifiedData,
      queryWindSpeeds: [1.5, 15.0]
    });

    // Below domain (v = 1.5 < 3.0)
    const ptBelow = result.points.find(p => p.windSpeed_mps === 1.5);
    assert.strictEqual(ptBelow.status, 'out_of_range');
    assert.strictEqual(ptBelow.electricalPower_W, null);
    assert.ok(ptBelow.reason.includes('Extrapolation is strictly disabled'));

    // Above domain (v = 15.0 > 12.0)
    const ptAbove = result.points.find(p => p.windSpeed_mps === 15.0);
    assert.strictEqual(ptAbove.status, 'out_of_range');
    assert.strictEqual(ptAbove.electricalPower_W, null);
    assert.ok(ptAbove.reason.includes('Extrapolation is strictly disabled'));
  });
});
