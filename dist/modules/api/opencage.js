import { OpenCageResponseSchema } from '../schemas/openCage.js';
import { API_OPENCAGE_URL, API_KEY_OPENCAGE } from '../constants.js';
import { fetchJSON } from '../helpers/fetch.js';
import { buildUrl } from '../helpers/queryBuilder.js';
import { parseWithSchema } from '../helpers/zodUtils.js';
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
        context: 'OpenCage',
    });
    const parsedData = parseWithSchema({
        schema: OpenCageResponseSchema,
        data: data,
    });
    return {
        lat: parsedData.results[0].geometry.lat,
        lng: parsedData.results[0].geometry.lng,
    };
}
