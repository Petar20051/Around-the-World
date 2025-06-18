export async function withRetry<T>(
	fn: () => Promise<T>,
	retries: number = 2,
	delayMs: number = 1000,
	errorMessage: string = 'Function execution failed'
): Promise<T> {
	try {
		return await fn();
	} catch (error) {
		if (retries > 0) {
			await new Promise((res) => setTimeout(res, delayMs));
			return withRetry(fn, retries - 1, delayMs, errorMessage);
		}
		throw new Error('Maximum retries exceeded');
	}
}
