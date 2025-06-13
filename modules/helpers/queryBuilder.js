export function buildUrl(baseUrl, queryParams = {}) {
    const url = new URL(baseUrl);

    Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== null) {
            url.searchParams.append(key, value);
        }
    });

    return url.toString();
}