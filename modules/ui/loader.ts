const loader = document.querySelector('#loader-container');
const refreshBtn = document.querySelector('#refresh-btn') as HTMLButtonElement;
const newUserBtn = document.querySelector('#new-users-btn') as HTMLButtonElement;
const cardsContainer = document.querySelector('.card-list');

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
