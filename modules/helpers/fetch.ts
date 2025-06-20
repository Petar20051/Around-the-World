import {ERROR_MESSAGES} from '../constants/errorMessages';
import {fetchJSONParams} from '../types/params';

export async function fetchJSON<T>({url, context}: fetchJSONParams): Promise<T> {
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`${context ? context + ' ' : ''}${ERROR_MESSAGES.FETCH_ERROR} : ${response.status}`);
	}
	return await response.json();
}
