import {fetchJSON} from '../helpers/fetch.js';
import {withRetry} from '../helpers/retry.js';
import {getWeatherDescription} from '../helpers/weatherCodes.js';
import {API_OPENMETEO_URL, OPENMETEO_QUERY} from '../constants.js';
import {buildUrl} from '../helpers/queryBuilder.js';
import {OpenMeteoResponse, Weather} from '../types/weather.js';

export async function fetchCurrentWeatherStats(latitude: number, longitude: number, retries: number = 2): Promise<Weather> {
	const requestUrl = buildUrl(API_OPENMETEO_URL, {
		latitude,
		longitude,
		...OPENMETEO_QUERY,
	});

	const fetchWeather = async (): Promise<Weather> => {
		const data = await fetchJSON<OpenMeteoResponse>(requestUrl, 'Open-Meteo API');
		const weatherStats = data.current;
		return {
			temperature: weatherStats.temperature_2m,
			humidity: weatherStats.relative_humidity_2m,
			condition: getWeatherDescription(weatherStats.weather_code),
		};
	};

	return withRetry(fetchWeather, retries, 1000);
}
