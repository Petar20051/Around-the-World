const loader: HTMLElement | null = document.querySelector('#loader-container');
const refreshBtn: HTMLButtonElement | null = document.querySelector('#refresh-btn');
const newUserBtn: HTMLButtonElement | null = document.querySelector('#new-users-btn');
const cardsContainer: HTMLButtonElement | null = document.querySelector('.card-list');

export function setLoadingState(isLoading: boolean): void {
	setVisualLoading(isLoading);
	setButtonsEnabled(!isLoading);
}

function setVisualLoading(isLoading: boolean): void {
	if (loader && cardsContainer) {
		loader.classList.toggle('hidden', !isLoading);
		cardsContainer.classList.toggle('hidden', isLoading);
	}
}

function setButtonsEnabled(enabled: boolean): void {
	if (refreshBtn && newUserBtn) {
		refreshBtn.disabled = !enabled;
		newUserBtn.disabled = !enabled;
	}
}
