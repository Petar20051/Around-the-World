import { API_KEY_OPENCAGE, API_OPENCAGE_URL } from '../constants.js';
import { fetchJSON } from '../helpers/fetch.js';
import { buildUrl } from '../helpers/queryBuilder.js';

export async function fetchCoordinatesByLocation(city, country) {
  const query = `${city}, ${country}`;
  const requestUrl = buildUrl(API_OPENCAGE_URL, {
    key: API_KEY_OPENCAGE,
    q: query,
    pretty: 1,
    no_annotations: 1
  });

  const data = await fetchJSON(requestUrl, 'OpenCage API fetch error:');
  if (!Array.isArray(data.results) || data.results.length === 0) {
    throw new Error(`No coordinates found for ${query}`);
  }

  const { lat, lng } = data.results[0].geometry;
  return { lat, lng };
}

