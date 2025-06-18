import { API_OPENCAGE_URL, API_KEY_OPENCAGE } from '../constants.js';
import { fetchJSON } from '../helpers/fetch.js';
import { buildUrl } from '../helpers/queryBuilder.js';
export async function fetchCoordinatesByLocation({ city, country }) {
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
    const data = await fetchJSON({
        url: requestUrl,
        errorMsg: 'OpenCage API fetch error:',
    });
    const geometry = data.results[0]?.geometry;
    if (!geometry) {
        throw new Error(`No coordinates found for ${query}`);
    }
    return {
        lat: geometry.lat,
        lng: geometry.lng,
    };
}
