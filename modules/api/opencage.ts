import {API_OPENCAGE_URL, API_KEY_OPENCAGE} from '../constants.js';
import {fetchJSON} from '../helpers/fetch.js';
import {buildUrl} from '../helpers/queryBuilder.js';
import {Coordinates} from '../types.js';

type OpenCageResponse = {
	results: {
		geometry: {lat: number; lng: number};
	}[];
};

export async function fetchCoordinatesByLocation(
	city: string,
	country: string
): Promise<Coordinates> {
	const query: string = `${city}, ${country}`;
	const requestUrl: string = buildUrl(API_OPENCAGE_URL, {
		key: API_KEY_OPENCAGE,
		q: query,
		pretty: 1,
		no_annotations: 1,
	});

	const data = await fetchJSON<OpenCageResponse>(requestUrl, 'OpenCage API fetch error:');
	const geometry = data.results[0]?.geometry;

	if (!geometry) {
		throw new Error(`No coordinates found for ${query}`);
	}

	return {
		lat: geometry.lat,
		lng: geometry.lng,
	};
}
