export function clearUserCards(): void {
	const container = document.querySelector('.card-list');
	if (container) {
		container.innerHTML = '';
	}
}
