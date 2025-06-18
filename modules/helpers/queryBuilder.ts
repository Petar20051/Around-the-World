export function buildUrl(
	baseUrl: string,
	queryParams: Record<string, string | number | null | undefined> = {}
): string {
	const url = new URL(baseUrl);

	for (const key in queryParams) {
		const value = queryParams[key];
		if (value != null) {
			url.searchParams.set(key, String(value));
		}
	}

	return url.toString();
}
