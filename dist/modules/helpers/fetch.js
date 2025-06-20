import { DEFAULT_FETCH_ERROR_MSG } from '../constants';
export async function fetchJSON({ url, context }) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`${context ? context + ' ' : ''}${DEFAULT_FETCH_ERROR_MSG} : ${response.status}`);
    }
    return await response.json();
}
