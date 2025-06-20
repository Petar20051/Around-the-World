import {DEFAULT_FETCH_ERROR_MSG} from '../constants';
import {fetchJSONParams} from '../types/params';

export async function fetchJSON<T>({url, context}: fetchJSONParams): Promise<T> {
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`${context ? context + ' ' : ''}${DEFAULT_FETCH_ERROR_MSG} : ${response.status}`);
	}
	return await response.json();
}
