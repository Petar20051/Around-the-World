import {fetchJSON} from '../helpers/fetch.js';
import {withRetry} from '../helpers/retry.js';
import {getWeatherDescription} from '../helpers/weatherCodes.js';
import {API_OPENMETEO_URL, OPENMETEO_QUERY} from '../constants.js';
import {buildUrl} from '../helpers/queryBuilder.js';
import {Weather} from '../types/weather.js';
import {fetchCurrentWeatherStatsParams} from '../types/params.js';
import {OpenMeteoResponse, OpenMeteoResponseSchema} from '../schemas/openMeteo.js';

export async function fetchCurrentWeatherStats({latitude, longitude}: fetchCurrentWeatherStatsParams): Promise<Weather> {
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

		const parsed = OpenMeteoResponseSchema.safeParse(data);

		if (!parsed.success) {
			throw new Error('Invalid OpenMeteo API response');
		}

		return {
			condition: getWeatherDescription(data.current.weather_code),
			humidity: data.current.relative_humidity_2m,
			temperature: data.current.temperature_2m,
		};
	};

	return withRetry({fnToRetry: fetchWeather});
}
