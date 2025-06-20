import {DEFAULT_RETRIES_COUNT, DEFAULT_RETRY_DELAY_MS} from '../constants/defaults';
import {ERROR_MESSAGES} from '../constants/errorMessages';
import {withRetryParams} from '../types/params';

export async function withRetry<T>({
	fnToRetry,
	retries = DEFAULT_RETRIES_COUNT,
	delayMs = DEFAULT_RETRY_DELAY_MS,
	errorMessage = ERROR_MESSAGES.RETRY_FAILED,
}: withRetryParams<T>): Promise<T> {
	try {
		return await fnToRetry();
	} catch (error) {
		if (retries > 0) {
			return withRetry({fnToRetry, retries: retries - 1, delayMs, errorMessage});
		}
		throw new Error(`${errorMessage}: maximum retries exceeded`);
	}
}
