export async function withRetry(fn, retries = 2, delayMs = 1000) {
    try {
        return await fn();
    } catch (error) {
        if (retries > 0) {
            await new Promise(res => setTimeout(res, delayMs));
            return withRetry(fn, retries - 1, delayMs);
        }
        throw error;
    }
}