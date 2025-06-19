import {withRetryParams} from '../types/params';

export async function withRetry<T>({
	fnToRetry,
	retries = 2,
	delayMs = 1000,
	errorMessage = 'Function execution failed',
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
