export async function fetchJSON({ url, errorMsg = 'API fetch error' }) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`${errorMsg}: ${response.status}`);
    }
    return await response.json();
}
