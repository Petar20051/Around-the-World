import { setLoadingState } from './loader.js';
const errorBox = document.getElementById('error-message');
export function setErrorState(message = '') {
    if (errorBox) {
        if (message) {
            errorBox.textContent = message;
            errorBox.classList.remove('hidden');
            setLoadingState(false);
        }
        else {
            errorBox.textContent = '';
            errorBox.classList.add('hidden');
        }
    }
}
