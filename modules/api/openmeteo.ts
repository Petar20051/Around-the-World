import {fetchJSON} from '../helpers/fetch.js';
import {withRetry} from '../helpers/retry.js';
import {getWeatherDescription} from '../helpers/weatherCodes.js';
import {buildUrl} from '../helpers/queryBuilder.js';
import {Weather} from '../types/weather.js';
import {fetchCurrentWeatherStatsParams} from '../types/params.js';
import {OpenMeteoResponse, OpenMeteoResponseSchema} from '../schemas/openMeteo.js';
import {parseWithSchema} from '../helpers/zodUtils.js';
import {API_OPENMETEO_URL, OPENMETEO_QUERY} from '../constants/api.js';

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
			context: 'OpenMeteo',
		});

		const parsedData = parseWithSchema<OpenMeteoResponse>({
			schema: OpenMeteoResponseSchema,
			data: data,
		});

		return {
			condition: getWeatherDescription(parsedData.current.weather_code),
			humidity: parsedData.current.relative_humidity_2m,
			temperature: parsedData.current.temperature_2m,
		};
	};

	return withRetry({fnToRetry: fetchWeather});
}
