import {OpenCageResponse, OpenCageResponseSchema} from '../schemas/openCage.js';
import {API_OPENCAGE_URL, API_KEY_OPENCAGE} from '../constants.js';
import {fetchJSON} from '../helpers/fetch.js';
import {buildUrl} from '../helpers/queryBuilder.js';
import {Coordinates} from '../types/coordinates.js';
import {fetchCoordinatesByLocationParams} from '../types/params.js';

export async function fetchCoordinatesByLocation({city, country}: fetchCoordinatesByLocationParams): Promise<Coordinates> {
	const query = `${city}, ${country}`;

	const requestUrl = buildUrl({
		baseUrl: API_OPENCAGE_URL,
		queryParams: {
			key: API_KEY_OPENCAGE,
			q: query,
			pretty: 1,
			no_annotations: 1,
		},
	});

	const data = await fetchJSON<OpenCageResponse>({
		url: requestUrl,
		errorMsg: 'OpenCage API fetch error:',
	});

	const parsed = OpenCageResponseSchema.safeParse(data);

	if (!parsed.success || !parsed.data.results[0]) {
		throw new Error('Invalid OpenCage API response');
	}

	return {
		lat: parsed.data.results[0].geometry.lat,
		lng: parsed.data.results[0].geometry.lng,
	};
}
