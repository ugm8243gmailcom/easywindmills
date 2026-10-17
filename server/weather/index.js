/**
 * EasyWindmill - Weather Service Module
 * Initializes and manages active weather provider.
 */

import { UnconfiguredWeatherProvider, OpenMeteoWeatherProvider } from './provider.js';

export function createWeatherService(env = process.env) {
  const providerType = (env.WEATHER_PROVIDER || '').trim().toLowerCase();

  let activeProvider;
  if (providerType === 'open-meteo') {
    const lat = env.WEATHER_LATITUDE ? parseFloat(env.WEATHER_LATITUDE) : 53.5511;
    const lon = env.WEATHER_LONGITUDE ? parseFloat(env.WEATHER_LONGITUDE) : 9.9937;
    activeProvider = new OpenMeteoWeatherProvider({ latitude: lat, longitude: lon });
  } else {
    activeProvider = new UnconfiguredWeatherProvider();
  }

  return {
    getProvider: () => activeProvider,
    getStatus: () => activeProvider.getStatus(),
    getCurrentWeather: () => activeProvider.getCurrentWeather()
  };
}

export const defaultWeatherService = createWeatherService();
