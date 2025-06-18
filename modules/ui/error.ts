import {setLoadingState} from './loader.js';

const errorBox = document.getElementById('error-message');

export function setErrorState(message: string = ''): void {
	if (!errorBox) return;

	errorBox.textContent = message;

	const shouldShowError = !!message;
	errorBox.classList.toggle('hidden', !shouldShowError);

	if (shouldShowError) {
		setLoadingState(false);
	}
}
