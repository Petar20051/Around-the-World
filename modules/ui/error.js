import { toggleLoader } from './loader.js';

const errorBox = document.getElementById('error-message')


export function handleError(message = '') {
    if (message) {
        errorBox.textContent = message;
        errorBox.classList.remove('hidden');
        toggleLoader(false);
    } else {
        errorBox.textContent = '';
        errorBox.classList.add('hidden');
    }
}