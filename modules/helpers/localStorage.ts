export function saveToLocalStorage(key: string, value: unknown): void {
	localStorage.setItem(key, JSON.stringify(value));
}

export function loadFromLocalStorage<T>(key: string): T | null {
	const raw = localStorage.getItem(key);
	if (!raw) return null;
	return JSON.parse(raw) as T;
}
