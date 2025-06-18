export async function fetchJSON(url, errorMsg = 'API fetch error') {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`${errorMsg}: ${response.status}`);
        }
        return await response.json();
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(errorMsg, error.message);
        }
        else {
            console.error(errorMsg, error);
        }
        throw error;
    }
}
