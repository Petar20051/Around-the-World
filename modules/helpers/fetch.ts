import {fetchJSONParams} from '../types/params';

export async function fetchJSON<T>({url, errorMsg = 'API fetch error'}: fetchJSONParams): Promise<T> {
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`${errorMsg}: ${response.status}`);
	}
	return await response.json();
}
