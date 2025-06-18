export async function withRetry<T>({
	fn,
	retries = 2,
	delayMs = 1000,
	errorMessage = 'Function execution failed',
}: {
	fn: () => Promise<T>;
	retries?: number;
	delayMs?: number;
	errorMessage?: string;
}): Promise<T> {
	try {
		return await fn();
	} catch (error) {
		if (retries > 0) {
			await new Promise((res) => setTimeout(res, delayMs));
			return withRetry({fn, retries: retries - 1, delayMs, errorMessage});
		}
		throw new Error(`${errorMessage}: maximum retries exceeded`);
	}
}
