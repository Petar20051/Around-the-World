import {OpenCageResponse, OpenCageResponseSchema} from '../schemas/openCage.js';
import {fetchJSON} from '../helpers/fetch.js';
import {buildUrl} from '../helpers/queryBuilder.js';
import {Coordinates} from '../types/coordinates.js';
import {fetchCoordinatesByLocationParams} from '../types/params.js';
import {parseWithSchema} from '../helpers/zodUtils.js';
import {API_OPENCAGE_KEY, API_OPENCAGE_URL} from '../constants/api.js';

export async function fetchCoordinatesByLocation({city, country}: fetchCoordinatesByLocationParams): Promise<Coordinates> {
	const query = `${city}, ${country}`;

	const requestUrl = buildUrl({
		baseUrl: API_OPENCAGE_URL,
		queryParams: {
			key: API_OPENCAGE_KEY,
			q: query,
			pretty: 1,
			no_annotations: 1,
		},
	});

	const data = await fetchJSON<OpenCageResponse>({
		url: requestUrl,
		context: 'OpenCage',
	});

	const parsedData = parseWithSchema<OpenCageResponse>({
		schema: OpenCageResponseSchema,
		data: data,
	});

	return {
		lat: parsedData.results[0].geometry.lat,
		lng: parsedData.results[0].geometry.lng,
	};
}
