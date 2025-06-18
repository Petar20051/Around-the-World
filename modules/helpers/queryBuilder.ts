export function buildUrl({
	baseUrl,
	queryParams = {},
}: {
	baseUrl: string;
	queryParams?: Record<string, string | number | undefined>;
}): string {
	const url = new URL(baseUrl);

	for (const key in queryParams) {
		const value = queryParams[key];
		if (value != null) {
			url.searchParams.set(key, String(value));
		}
	}

	return url.toString();
}
