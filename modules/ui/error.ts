import {setLoadingState} from './loader.js';

const errorBox: HTMLElement | null = document.getElementById('error-message');

export function setErrorState(message = '') {
	if (!errorBox) return;
	errorBox.textContent = message;
	errorBox.classList.toggle('hidden', !message);
	if (message) setLoadingState(false);
}
