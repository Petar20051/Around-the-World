import { fetchJSON } from '../helpers/fetch.js';
import { withRetry } from '../helpers/retry.js';
import { getWeatherDescription } from '../helpers/weatherCodes.js';
import { API_OPENMETEO_URL, OPENMETEO_QUERY } from '../constants.js';
import { buildUrl } from '../helpers/queryBuilder.js';
export async function fetchCurrentWeatherStats({ latitude, longitude }) {
    const requestUrl = buildUrl({
        baseUrl: API_OPENMETEO_URL,
        queryParams: {
            latitude,
            longitude,
            ...OPENMETEO_QUERY,
        },
    });
    const fetchWeather = async () => {
        const data = await fetchJSON({
            url: requestUrl,
            errorMsg: 'Open-Meteo API fetch error',
        });
        return {
            temperature: data.current.temperature_2m,
            humidity: data.current.relative_humidity_2m,
            condition: getWeatherDescription(data.current.weather_code),
        };
    };
    return withRetry({ fn: fetchWeather });
}
