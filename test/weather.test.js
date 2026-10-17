/**
 * EasyWindmill - Weather Integration Unit Tests
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { createWeatherService } from '../server/weather/index.js';
import { UnconfiguredWeatherProvider, OpenMeteoWeatherProvider } from '../server/weather/provider.js';

describe('Weather Service - Unconfigured Default State', () => {
  const service = createWeatherService({});

  test('Reports unconfigured status when no provider environment variable is present', () => {
    const status = service.getStatus();
    assert.strictEqual(status.status, 'unconfigured');
    assert.strictEqual(status.configured, false);
    assert.strictEqual(status.activeProvider, null);
    assert.ok(status.message.includes('No live weather provider is configured'));
    assert.ok(Array.isArray(status.supportedProviders));
    assert.ok(status.supportedProviders.includes('open-meteo'));
  });

  test('Documents measurement height vs hub-height wind shear in configuration guide', () => {
    const status = service.getStatus();
    assert.ok(status.configurationGuide);
    assert.ok(status.configurationGuide.observationHeightNotice.includes('10 metres above ground level'));
    assert.ok(status.configurationGuide.observationHeightNotice.includes('wind shear profile adjustment'));
  });

  test('Unconfigured provider returns structured unavailable response', async () => {
    try {
      await service.getCurrentWeather();
      assert.fail('Should have thrown an unavailable error');
    } catch (err) {
      assert.strictEqual(err.statusCode, 503);
      assert.strictEqual(err.details.available, false);
      assert.strictEqual(err.details.status, 'unconfigured');
      assert.strictEqual(err.details.data, null);
    }
  });
});

describe('Weather Service - Configured Provider Initialization', () => {
  test('Initializes Open-Meteo provider when WEATHER_PROVIDER=open-meteo', () => {
    const service = createWeatherService({
      WEATHER_PROVIDER: 'open-meteo',
      WEATHER_LATITUDE: '54.5',
      WEATHER_LONGITUDE: '10.2'
    });

    const status = service.getStatus();
    assert.strictEqual(status.status, 'configured');
    assert.strictEqual(status.configured, true);
    assert.strictEqual(status.activeProvider, 'open-meteo');
    assert.strictEqual(status.coordinates.latitude, 54.5);
    assert.strictEqual(status.coordinates.longitude, 10.2);
    assert.ok(status.observationHeightNotice.includes('10m AGL'));
  });
});
