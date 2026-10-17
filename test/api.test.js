 /**
 * EasyWindmill - API Endpoints Integration Tests
 * Tests real HTTP interactions, schemas, status codes, and error payloads.
 */

import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from '../server/index.js';

describe('HTTP Simulation Backend API Endpoints', () => {
  let server;
  let baseUrl;

  before(async () => {
    server = createServer();
    await new Promise((resolve) => {
      server.listen(0, '127.0.0.1', () => {
        const port = server.address().port;
        baseUrl = `http://127.0.0.1:${port}`;
        resolve();
      });
    });
  });

  after(async () => {
    if (server) {
      await new Promise((resolve) => server.close(resolve));
    }
  });

  test('GET /api/health returns status, version, and model architecture', async () => {
    const res = await fetch(`${baseUrl}/api/health`);
    assert.strictEqual(res.status, 200);
    assert.ok(res.headers.get('content-type').includes('application/json'));

    const data = await res.json();
    assert.strictEqual(data.status, 'ok');
    assert.strictEqual(data.service, 'easywindmill-simulation-api');
    assert.strictEqual(data.version, '1.0.0');
    assert.strictEqual(data.model.id, 'hawt-geared-educational');
    assert.strictEqual(data.model.architecture.rotorAxis, 'horizontal');
    assert.strictEqual(data.model.architecture.drivetrainType, 'speed_increasing_parallel_shaft_gearbox');
  });

  test('GET /api/simulation/model returns model definition, assumptions, and limitations', async () => {
    const res = await fetch(`${baseUrl}/api/simulation/model`);
    assert.strictEqual(res.status, 200);

    const data = await res.json();
    assert.strictEqual(data.status, 'success');
    assert.strictEqual(data.model.architecture.bladeCount, 3);
    assert.strictEqual(data.model.specificationsStatus.dimensions, 'unverified_educational_example');
    assert.ok(data.model.educationalBaseline.rotorRadius_m > 0);
    assert.ok(data.model.educationalBaseline.assumedCp < 0.593);
    assert.ok(Array.isArray(data.model.modelLimitations));
    assert.ok(Array.isArray(data.model.references));
  });

  test('POST /api/simulation/calculate with explicit educational assumptions', async () => {
    const res = await fetch(`${baseUrl}/api/simulation/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        windSpeed_mps: 10.0,
        useEducationalAssumptions: true
      })
    });

    assert.strictEqual(res.status, 200);
    const data = await res.json();

    assert.strictEqual(data.status, 'success');
    assert.strictEqual(data.inputs.windSpeed_mps, 10.0);

    // Results check
    assert.strictEqual(data.results.geometry.rotorRadius_m, 40.0);
    assert.strictEqual(data.results.geometry.rotorDiameter_m, 80.0);
    assert.ok(Math.abs(data.results.aerodynamics.availableWindPower_W - 3078760.8) < 1.0);
    assert.ok(data.results.aerodynamics.mechanicalPower_W > 1000000.0);
    assert.ok(data.results.electrical.electricalPower_W > 1000000.0);
    assert.ok(data.results.rotorDynamics.rotorRPM > 15.0);
    assert.ok(data.results.drivetrain.generatorShaftRPM > 1000.0);

    // Metadata categorisation
    assert.ok(data.metadata.educationalAssumptions.cp);
    assert.ok(data.metadata.educationalAssumptions.drivetrainEfficiency);
    assert.ok(data.metadata.educationalAssumptions.generatorEfficiency);
    assert.ok(data.metadata.educationalAssumptions.gearboxRatio);
    assert.ok(data.metadata.calculatedValues.includes('aerodynamics.availableWindPower_W'));
    assert.ok(data.metadata.calculatedValues.includes('electrical.electricalPower_W'));
  });

  test('POST /api/simulation/calculate without educational assumptions and missing efficiencies marks electrical power unavailable', async () => {
    const res = await fetch(`${baseUrl}/api/simulation/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        windSpeed_mps: 9.0,
        rotorRadius_m: 45.0,
        cp: 0.40
        // No efficiencies or gearbox ratio provided, and useEducationalAssumptions is false
      })
    });

    assert.strictEqual(res.status, 200);
    const data = await res.json();

    assert.strictEqual(data.status, 'success');
    assert.ok(data.results.aerodynamics.mechanicalPower_W > 0);

    // Electrical output must be null and marked unavailable
    assert.strictEqual(data.results.electrical.electricalPower_W, null);
    assert.strictEqual(data.results.electrical.status, 'unavailable');

    // Gearbox output must be null and marked unavailable
    assert.strictEqual(data.results.drivetrain.generatorShaftRPM, null);
    assert.strictEqual(data.results.drivetrain.status, 'unavailable');

    // Unavailable list in metadata records missing parameters
    const unavailableFields = data.metadata.unavailableValues.map(u => u.field);
    assert.ok(unavailableFields.includes('electrical.electricalPower_W'));
    assert.ok(unavailableFields.includes('drivetrain.generatorShaftRPM'));
  });

  test('POST /api/simulation/calculate rejects negative wind speed with HTTP 400', async () => {
    const res = await fetch(`${baseUrl}/api/simulation/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        windSpeed_mps: -5.0,
        useEducationalAssumptions: true
      })
    });

    assert.strictEqual(res.status, 400);
    const data = await res.json();
    assert.strictEqual(data.status, 'error');
    assert.strictEqual(data.field, 'windSpeed_mps');
    assert.ok(data.message.includes('below the minimum allowed bound'));
  });

  test('POST /api/simulation/calculate rejects negative rotor radius with HTTP 400', async () => {
    const res = await fetch(`${baseUrl}/api/simulation/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        windSpeed_mps: 10.0,
        rotorRadius_m: -20.0
      })
    });

    assert.strictEqual(res.status, 400);
    const data = await res.json();
    assert.strictEqual(data.status, 'error');
    assert.strictEqual(data.field, 'rotorRadius_m');
  });

  test('POST /api/simulation/calculate rejects Cp exceeding Betz limit with HTTP 400', async () => {
    const res = await fetch(`${baseUrl}/api/simulation/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        windSpeed_mps: 10.0,
        rotorRadius_m: 40.0,
        cp: 0.65 // Exceeds Betz limit 0.593
      })
    });

    assert.strictEqual(res.status, 400);
    const data = await res.json();
    assert.strictEqual(data.status, 'error');
    assert.strictEqual(data.field, 'cp');
    assert.ok(data.message.includes('exceeds the theoretical Betz limit'));
  });

  test('POST /api/simulation/calculate handles malformed JSON with HTTP 400', async () => {
    const res = await fetch(`${baseUrl}/api/simulation/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{"windSpeed_mps": 10.0, invalid_json'
    });

    assert.strictEqual(res.status, 400);
    const data = await res.json();
    assert.strictEqual(data.status, 'error');
    assert.ok(data.message.includes('Malformed JSON'));
  });

  test('POST /api/simulation/power-curve in educational theoretical mode', async () => {
    const res = await fetch(`${baseUrl}/api/simulation/power-curve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mode: 'educational_theoretical',
        windSpeedMin: 0,
        windSpeedMax: 20,
        windSpeedStep: 5,
        useEducationalAssumptions: true
      })
    });

    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.mode, 'educational_theoretical');
    assert.strictEqual(data.points.length, 5); // 0, 5, 10, 15, 20
    assert.ok(data.limitationsNotice);
  });

  test('POST /api/simulation/power-curve in verified mode interpolates and rejects out of range', async () => {
    const res = await fetch(`${baseUrl}/api/simulation/power-curve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mode: 'verified_turbine_curve',
        dataSource: 'NREL 5-MW Baseline Reference Turbine Technical Report',
        dataUnits: 'kW',
        dataPoints: [
          { windSpeed_mps: 3.0, power: 0.0 },
          { windSpeed_mps: 6.0, power: 450.0 },
          { windSpeed_mps: 9.0, power: 1800.0 },
          { windSpeed_mps: 12.0, power: 5000.0 }
        ],
        queryWindSpeeds: [2.0, 7.5, 15.0]
      })
    });

    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.mode, 'verified_turbine_curve');
    assert.strictEqual(data.dataSource, 'NREL 5-MW Baseline Reference Turbine Technical Report');

    // 2.0 m/s is below 3.0 => out of range
    assert.strictEqual(data.points[0].status, 'out_of_range');
    assert.strictEqual(data.points[0].electricalPower_W, null);

    // 7.5 m/s is between 6.0 and 9.0 => interpolated
    assert.strictEqual(data.points[1].status, 'interpolated');
    // 450 + 0.5 * (1800 - 450) = 1125 kW => 1,125,000 W
    assert.strictEqual(data.points[1].electricalPower_W, 1125000.0);

    // 15.0 m/s is above 12.0 => out of range
    assert.strictEqual(data.points[2].status, 'out_of_range');
    assert.strictEqual(data.points[2].electricalPower_W, null);
  });

  test('GET /api/weather/status reports unconfigured status', async () => {
    const res = await fetch(`${baseUrl}/api/weather/status`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.status, 'unconfigured');
    assert.strictEqual(data.configured, false);
    assert.strictEqual(data.activeProvider, null);
  });

  test('GET /api/weather/current returns structured unavailable response', async () => {
    const res = await fetch(`${baseUrl}/api/weather/current`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.available, false);
    assert.strictEqual(data.status, 'unconfigured');
    assert.strictEqual(data.data, null);
  });

  test('GET /api/nonexistent-route returns HTTP 404', async () => {
    const res = await fetch(`${baseUrl}/api/nonexistent-route`);
    assert.strictEqual(res.status, 404);
    const data = await res.json();
    assert.strictEqual(data.status, 'error');
    assert.strictEqual(data.error, 'Endpoint Not Found');
  });

  test('PUT /api/health returns HTTP 405 Method Not Allowed', async () => {
    const res = await fetch(`${baseUrl}/api/health`, { method: 'PUT' });
    assert.strictEqual(res.status, 405);
    const data = await res.json();
    assert.strictEqual(data.status, 'error');
    assert.strictEqual(data.error, 'Method Not Allowed');
  });

  test('OPTIONS /api/health returns HTTP 204 with CORS headers', async () => {
    const res = await fetch(`${baseUrl}/api/health`, { method: 'OPTIONS' });
    assert.strictEqual(res.status, 204);
    assert.strictEqual(res.headers.get('access-control-allow-origin'), '*');
    assert.ok(res.headers.get('access-control-allow-methods').includes('GET'));
  });
});
