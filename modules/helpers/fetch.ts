export async function fetchJSON<T>(url: string, errorMsg: string = 'API fetch error'): Promise<T> {
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`${errorMsg}: ${response.status}`);
		}
		return await response.json();
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error(errorMsg, error.message);
		} else {
			console.error(errorMsg, error);
		}
		throw error;
	}
}
