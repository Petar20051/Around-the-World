export async function fetchJSON<T>({url, errorMsg = 'API fetch error'}: {url: string; errorMsg?: string}): Promise<T> {
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`${errorMsg}: ${response.status}`);
	}
	return await response.json();
}
