import {fetchJSON} from '../helpers/fetch.js';
import {withRetry} from '../helpers/retry.js';
import {getWeatherDescription} from '../helpers/weatherCodes.js';
import {API_OPENMETEO_URL, OPENMETEO_QUERY} from '../constants.js';
import {buildUrl} from '../helpers/queryBuilder.js';
import {OpenMeteoResponse, Weather} from '../types/weather.js';

export async function fetchCurrentWeatherStats({latitude, longitude}: {latitude: number; longitude: number}): Promise<Weather> {
	const requestUrl = buildUrl({
		baseUrl: API_OPENMETEO_URL,
		queryParams: {
			latitude,
			longitude,
			...OPENMETEO_QUERY,
		},
	});

	const fetchWeather = async (): Promise<Weather> => {
		const data = await fetchJSON<OpenMeteoResponse>({
			url: requestUrl,
			errorMsg: 'Open-Meteo API fetch error',
		});

		return {
			temperature: data.current.temperature_2m,
			humidity: data.current.relative_humidity_2m,
			condition: getWeatherDescription(data.current.weather_code),
		};
	};

	return withRetry({fn: fetchWeather});
}
