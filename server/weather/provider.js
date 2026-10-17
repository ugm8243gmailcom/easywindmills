/**
 * EasyWindmill - Weather Provider Interface and Implementations
 *
 * Keeps live meteorological data retrieval separate from deterministic
 * physics calculations.
 */

/**
 * Base WeatherProvider interface.
 */
export class WeatherProvider {
  constructor(name) {
    this.name = name;
  }

  isConfigured() {
    return false;
  }

  getStatus() {
    return {
      status: 'unconfigured',
      configured: false,
      activeProvider: null,
      message: 'No live weather provider is configured. Live weather data is unavailable.',
      supportedProviders: ['open-meteo'],
      configurationGuide: {
        instructions: 'To enable live weather observations, set environment variable WEATHER_PROVIDER=open-meteo. Optionally set WEATHER_LATITUDE (default: 53.5511) and WEATHER_LONGITUDE (default: 9.9937).',
        observationHeightNotice: 'Surface weather stations typically measure wind speed at 10 metres above ground level (AGL). Turbine hub heights typically range from 60m to 150m; calculating hub-height wind speed requires wind shear profile adjustment (e.g., Hellmann power-law alpha exponent or logarithmic roughness length z0).'
      }
    };
  }

  async getCurrentWeather() {
    throw new Error('WeatherProvider is not configured.');
  }
}

/**
 * Default unconfigured weather provider.
 * Returned when no external provider is activated in the environment.
 */
export class UnconfiguredWeatherProvider extends WeatherProvider {
  constructor() {
    super('unconfigured');
  }

  isConfigured() {
    return false;
  }

  async getCurrentWeather() {
    const error = new Error('No live weather provider is configured. Live weather data is unavailable.');
    error.statusCode = 503;
    error.details = {
      available: false,
      status: 'unconfigured',
      message: 'No live weather provider is configured. Live weather data is unavailable.',
      data: null
    };
    throw error;
  }
}

/**
 * Open-Meteo Weather Provider
 * Activated only when WEATHER_PROVIDER=open-meteo is explicitly set in environment.
 */
export class OpenMeteoWeatherProvider extends WeatherProvider {
  constructor({ latitude = 53.5511, longitude = 9.9937 } = {}) {
    super('open-meteo');
    this.latitude = latitude;
    this.longitude = longitude;
  }

  isConfigured() {
    return true;
  }

  getStatus() {
    return {
      status: 'configured',
      configured: true,
      activeProvider: 'open-meteo',
      message: 'Open-Meteo live weather provider is configured.',
      coordinates: {
        latitude: this.latitude,
        longitude: this.longitude
      },
      observationHeightNotice: 'Reported wind speed is measured at 10m AGL. It is not hub-height wind speed.'
    };
  }

  async getCurrentWeather() {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${this.latitude}&longitude=${this.longitude}&current=temperature_2m,wind_speed_10m,wind_direction_10m&wind_speed_unit=ms`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Open-Meteo upstream request failed with HTTP ${response.status}`);
    }

    const payload = await response.json();
    const current = payload.current;

    return {
      available: true,
      status: 'retrieved',
      provider: 'open-meteo',
      observationTimestamp: current.time,
      coordinates: {
        latitude: payload.latitude,
        longitude: payload.longitude,
        elevation_m: payload.elevation
      },
      windSpeed: {
        value: current.wind_speed_10m,
        unit: 'm/s',
        measurementHeight_m: 10,
        isHubHeightAssumed: false,
        notes: 'Wind speed measured at standard 10m AGL. Does not account for vertical wind shear to hub height.'
      },
      windDirection: {
        value: current.wind_direction_10m,
        unit: 'degrees'
      },
      temperature: {
        value: current.temperature_2m,
        unit: 'celsius'
      }
    };
  }
}
