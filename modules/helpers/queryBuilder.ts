import {buildUrlParams} from '../types/paramsTypes';

export function buildUrl({baseUrl, queryParams = {}}: buildUrlParams): string {
	const url = new URL(baseUrl);

	for (const key in queryParams) {
		const value = queryParams[key];
		if (value != null) {
			url.searchParams.set(key, String(value));
		}
	}

	return url.toString();
}
