/**
 * EasyWindmill - Physics Engine Unit Tests
 * Deterministic tests with precise numerical verification and SI consistency.
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { BETZ_LIMIT, STANDARD_AIR_DENSITY_KG_M3 } from '../server/constants.js';
import {
  calculateRotorGeometry,
  calculateAvailableWindPower,
  calculateMechanicalPower,
  calculateElectricalPower,
  calculateRotorDynamics,
  calculateGearboxOutput
} from '../server/physics.js';

describe('Rotor Geometry Calculations', () => {
  test('Swept area and diameter for a known rotor radius (R = 40m)', () => {
    const R = 40.0;
    const geo = calculateRotorGeometry({ rotorRadius_m: R });

    assert.strictEqual(geo.rotorRadius_m, 40.0);
    assert.strictEqual(geo.rotorDiameter_m, 80.0);
    const expectedArea = Math.PI * 40.0 * 40.0; // 5026.548245743669 m^2
    assert.ok(Math.abs(geo.sweptArea_m2 - expectedArea) < 1e-9);
    assert.strictEqual(geo.bladeCount, 3);
  });

  test('Swept area scaling with the square of rotor radius (R^2 scaling)', () => {
    const geo1 = calculateRotorGeometry({ rotorRadius_m: 20.0 });
    const geo2 = calculateRotorGeometry({ rotorRadius_m: 40.0 });

    const ratio = geo2.sweptArea_m2 / geo1.sweptArea_m2;
    // Doubling radius from 20 to 40 must quadruple swept area (ratio = 4.0)
    assert.ok(Math.abs(ratio - 4.0) < 1e-12);
  });

  test('Rotor radius derived from diameter (D = 80m => R = 40m)', () => {
    const geo = calculateRotorGeometry({ rotorDiameter_m: 80.0 });
    assert.strictEqual(geo.rotorRadius_m, 40.0);
    assert.strictEqual(geo.rotorDiameter_m, 80.0);
  });

  test('Blade length approximation documents axis-to-tip assumption', () => {
    const geo = calculateRotorGeometry({ bladeLength_m: 40.0 });
    assert.strictEqual(geo.rotorRadius_m, 40.0);
    assert.ok(geo.geometryAssumption.includes('radial distance from rotor axis to blade tip'));
  });
});

describe('Available Wind Power Calculations', () => {
  test('Available wind power against manually verified calculation', () => {
    // Equation: P_wind = 0.5 * rho * A * v^3
    // For R = 40m => A = pi * 1600 = 5026.548245743669 m^2
    // For rho = 1.225 kg/m^3, v = 10.0 m/s => v^3 = 1000
    // P_wind = 0.5 * 1.225 * 5026.548245743669 * 1000 = 3,078,760.800517497 W (~3.07876 MW)
    const R = 40.0;
    const A = Math.PI * R * R;
    const v = 10.0;
    const rho = 1.225;

    const pWind = calculateAvailableWindPower(A, v, rho);
    const expected = 0.5 * rho * A * Math.pow(v, 3);

    assert.ok(Math.abs(pWind - expected) < 1e-6);
    assert.ok(Math.abs(pWind - 3078760.8005) < 1.0);
  });

  test('Wind power scaling with the cube of wind speed (v^3 scaling)', () => {
    const A = 5000.0;
    const rho = 1.225;

    const p5 = calculateAvailableWindPower(A, 5.0, rho);
    const p10 = calculateAvailableWindPower(A, 10.0, rho);
    const p15 = calculateAvailableWindPower(A, 15.0, rho);

    // Doubling wind speed from 5 to 10 m/s increases power by 2^3 = 8
    assert.ok(Math.abs((p10 / p5) - 8.0) < 1e-12);

    // Tripling wind speed from 5 to 15 m/s increases power by 3^3 = 27
    assert.ok(Math.abs((p15 / p5) - 27.0) < 1e-12);
  });

  test('Zero wind yields exactly zero kinetic power', () => {
    const A = 5026.55;
    const pWind = calculateAvailableWindPower(A, 0.0, 1.225);
    assert.strictEqual(pWind, 0.0);
  });
});

describe('Captured Mechanical Power Calculations', () => {
  test('Mechanical power calculated with educational Cp', () => {
    const pWind = 3000000.0; // 3 MW
    const cp = 0.42;

    const pMech = calculateMechanicalPower(pWind, cp);
    assert.strictEqual(pMech, 1260000.0); // 1.26 MW
  });

  test('Betz limit (16/27 ~ 0.5926) is respected', () => {
    const pWind = 1000000.0;
    const pMechBetz = calculateMechanicalPower(pWind, BETZ_LIMIT);
    assert.ok(Math.abs(pMechBetz - (16000000 / 27)) < 1e-6);

    // Cp above Betz limit throws Error
    assert.throws(() => {
      calculateMechanicalPower(pWind, 0.60);
    }, /exceeds the theoretical Betz limit|must be between 0 and the Betz limit/);

    // Negative Cp throws Error
    assert.throws(() => {
      calculateMechanicalPower(pWind, -0.05);
    }, /must be between 0 and the Betz limit/);
  });

  test('Missing Cp returns null without fabricating values', () => {
    const pMech = calculateMechanicalPower(1000000.0, null);
    assert.strictEqual(pMech, null);
  });
});

describe('Estimated Electrical Power and Losses', () => {
  test('Electrical power and component loss accounting', () => {
    const pMech = 1000000.0; // 1 MW mechanical
    const etaDrivetrain = 0.95;
    const etaGenerator = 0.94;

    const result = calculateElectricalPower(pMech, etaDrivetrain, etaGenerator);

    assert.strictEqual(result.status, 'calculated');
    const expectedCombined = 0.95 * 0.94; // 0.893
    assert.ok(Math.abs(result.combinedEfficiency - expectedCombined) < 1e-12);

    const expectedElectrical = 1000000.0 * 0.893; // 893,000 W
    assert.ok(Math.abs(result.electricalPower_W - expectedElectrical) < 1e-6);

    // Drivetrain loss = 50,000 W (5%)
    assert.ok(Math.abs(result.losses.drivetrainLoss_W - 50000.0) < 1e-6);
    // Generator loss = 950,000 * 0.06 = 57,000 W
    assert.ok(Math.abs(result.losses.generatorLoss_W - 57000.0) < 1e-6);
    // Total loss = 107,000 W
    assert.ok(Math.abs(result.losses.totalLoss_W - 107000.0) < 1e-6);
    // Conservation: P_elec + losses = P_mech
    assert.ok(Math.abs((result.electricalPower_W + result.losses.totalLoss_W) - pMech) < 1e-6);
  });

  test('Missing efficiencies report electrical power as unavailable', () => {
    const result = calculateElectricalPower(1000000.0, null, 0.94);
    assert.strictEqual(result.status, 'unavailable');
    assert.strictEqual(result.electricalPower_W, null);
    assert.ok(result.reason.includes('efficiency parameters are not verified'));
  });
});

describe('Rotor Dynamics, TSR, RPM, and Aerodynamic Torque', () => {
  test('Rotor speed from supplied target tip-speed ratio', () => {
    // lambda_target = 7.5, v = 10 m/s, R = 40 m
    // omega = 7.5 * 10 / 40 = 1.875 rad/s
    // RPM = 1.875 * 60 / (2 * pi) = 17.9049310978 RPM
    // tipSpeed = 1.875 * 40 = 75 m/s
    const dyn = calculateRotorDynamics({
      windSpeed_mps: 10.0,
      rotorRadius_m: 40.0,
      mechanicalPower_W: 1260000.0,
      targetTipSpeedRatio: 7.5
    });

    assert.strictEqual(dyn.angularVelocity_radps, 1.875);
    assert.ok(Math.abs(dyn.rotorRPM - 17.90493) < 1e-4);
    assert.strictEqual(dyn.tipSpeed_mps, 75.0);
    assert.strictEqual(dyn.tipSpeedRatio, 7.5);

    // Torque: tau = P_mech / omega = 1,260,000 / 1.875 = 672,000 N*m
    assert.ok(Math.abs(dyn.aerodynamicTorque_Nm - 672000.0) < 1e-6);
    assert.strictEqual(dyn.isRPMClamped, false);
  });

  test('Maximum RPM constraint clamps rotor speed', () => {
    // Unconstrained omega for lambda=7.5, v=15 m/s, R=40m is 7.5 * 15 / 40 = 2.8125 rad/s (26.857 RPM)
    // Clamping to maxRotorRPM = 20.0 RPM => maxOmega = 20 * 2 * pi / 60 = 2.094395 rad/s
    const dyn = calculateRotorDynamics({
      windSpeed_mps: 15.0,
      rotorRadius_m: 40.0,
      mechanicalPower_W: 2000000.0,
      targetTipSpeedRatio: 7.5,
      maxRotorRPM: 20.0
    });

    assert.strictEqual(dyn.isRPMClamped, true);
    assert.ok(Math.abs(dyn.rotorRPM - 20.0) < 1e-6);
    const expectedOmega = (20.0 * 2.0 * Math.PI) / 60.0;
    assert.ok(Math.abs(dyn.angularVelocity_radps - expectedOmega) < 1e-6);
  });

  test('Zero wind handling yields zero RPM and zero torque safely without NaN', () => {
    const dyn = calculateRotorDynamics({
      windSpeed_mps: 0.0,
      rotorRadius_m: 40.0,
      mechanicalPower_W: 0.0,
      targetTipSpeedRatio: 7.5
    });

    assert.strictEqual(dyn.angularVelocity_radps, 0.0);
    assert.strictEqual(dyn.rotorRPM, 0.0);
    assert.strictEqual(dyn.tipSpeed_mps, 0.0);
    assert.strictEqual(dyn.aerodynamicTorque_Nm, 0.0);
  });
});

describe('Gearbox and Synchronous Generator Output', () => {
  test('Generator speed using known gearbox step-up ratio (ratio = 90.0)', () => {
    // Rotor speed = 1.875 rad/s (17.9049 RPM)
    // Generator speed = 1.875 * 90 = 168.75 rad/s (1611.44 RPM)
    const rotorOmega = 1.875;
    const rotorRPM = (1.875 * 60.0) / (2.0 * Math.PI);
    const rotorTorque = 672000.0; // N*m
    const gearboxRatio = 90.0;
    const gearboxEfficiency = 0.95;

    const out = calculateGearboxOutput({
      rotorAngularVelocity_radps: rotorOmega,
      rotorRPM,
      aerodynamicTorque_Nm: rotorTorque,
      gearboxRatio,
      gearboxEfficiency
    });

    assert.strictEqual(out.status, 'calculated');
    assert.strictEqual(out.generatorShaftAngularVelocity_radps, 168.75);
    assert.ok(Math.abs(out.generatorShaftRPM - (rotorRPM * 90.0)) < 1e-6);

    // Generator torque: tau_gen = (tau_rotor * eta) / ratio = (672000 * 0.95) / 90 = 7093.333 N*m
    const expectedGenTorque = (rotorTorque * gearboxEfficiency) / gearboxRatio;
    assert.ok(Math.abs(out.generatorShaftTorque_Nm - expectedGenTorque) < 1e-6);
  });

  test('Missing gearbox ratio marks generator shaft speed as unavailable', () => {
    const out = calculateGearboxOutput({
      rotorAngularVelocity_radps: 1.875,
      rotorRPM: 17.9,
      aerodynamicTorque_Nm: 600000,
      gearboxRatio: null
    });

    assert.strictEqual(out.status, 'unavailable');
    assert.strictEqual(out.generatorShaftRPM, null);
    assert.ok(out.reason.includes('unverified and was not supplied'));
  });
});
