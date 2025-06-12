import { API_KEY_OPENCAGE, API_OPENCAGE_URL } from '../static.js';
import { fetchJSON } from '../helpers/fetchHelper.js';

export async function getCoordinates(city, country) {
  const query = `${city}, ${country}`;
  const request_url = `${API_OPENCAGE_URL}?key=${API_KEY_OPENCAGE}&q=${encodeURIComponent(query)}&pretty=1&no_annotations=1`;

  const data = await fetchJSON(request_url, 'OpenCage API fetch error:');
  if (!data.results || data.results.length === 0) {
    throw new Error("No coordinates found for " + query);
  }
  const { lat, lng } = data.results[0].geometry;
  return { lat, lng };
}