import { DEFAULT_RETRIES_COUNT, DEFAULT_RETRY_DELAY_MS, DEFAULT_RETRY_FAILED_MSG } from '../constants';
export async function withRetry({ fnToRetry, retries = DEFAULT_RETRIES_COUNT, delayMs = DEFAULT_RETRY_DELAY_MS, errorMessage = DEFAULT_RETRY_FAILED_MSG, }) {
    try {
        return await fnToRetry();
    }
    catch (error) {
        if (retries > 0) {
            return withRetry({ fnToRetry, retries: retries - 1, delayMs, errorMessage });
        }
        throw new Error(`${errorMessage}: maximum retries exceeded`);
    }
}
