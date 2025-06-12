export async function fetchJSON(url, errorMsg = 'API fetch error') {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`${errorMsg}: ${response.status}`);
        }
        return await response.json();
    }
    catch (error) {
        console.error(errorMsg, error.message);
        throw error;
    }
}
