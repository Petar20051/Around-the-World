import { ERROR_MESSAGES } from '../constants/errorMessages';
export async function fetchJSON({ url, context }) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`${context ? context + ' ' : ''}${ERROR_MESSAGES.FETCH_ERROR} : ${response.status}`);
    }
    return await response.json();
}
