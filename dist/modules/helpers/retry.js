export async function withRetry({ fn, retries = 2, delayMs = 1000, errorMessage = 'Function execution failed', }) {
    try {
        return await fn();
    }
    catch (error) {
        if (retries > 0) {
            return withRetry({ fn, retries: retries - 1, delayMs, errorMessage });
        }
        throw new Error(`${errorMessage}: maximum retries exceeded`);
    }
}
