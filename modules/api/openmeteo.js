import { fetchJSON } from "../helpers/fetch.js";
import { withRetry } from "../helpers/retry.js";
import { getWeatherDescription } from "../helpers/weatherCodes.js";
import { API_OPENMETEO_URL } from '../constants.js';
import { OPENMETEO_QUERY } from "../constants.js";

export async function getWeatherStats(latitude, longitude, retries = 2) {
  const request_url = `${API_OPENMETEO_URL}?latitude=${latitude}&longitude=${longitude}${OPENMETEO_QUERY}`;
  const fetchWeather = async () => {
    const data = await fetchJSON(request_url, 'Open-Meteo API');
    const weatherStats = data.current;
    return {
      latitude,
      longitude,
      temperature: weatherStats.temperature_2m,
      humidity: weatherStats.relative_humidity_2m,
      weatherDescription: getWeatherDescription(weatherStats.weather_code)
    };
  };

  return withRetry(fetchWeather, retries, 1000, `Open-Meteo API fetch failed for (${latitude}, ${longitude})`);
}
