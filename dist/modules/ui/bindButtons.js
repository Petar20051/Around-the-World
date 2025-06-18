import { refreshAllUsersWeather } from '../workflows/refreshWeather.js';
import { fetchAndRenderUsers } from '../workflows/fetchAndRenderUsers.js';
import { setLoadingState } from './loader.js';
import { clearUserCards } from '../display/clearUserCards.js';
import { setErrorState } from './error.js';
export function initButtonHandlers() {
    const refreshBtn = document.querySelector('#refresh-btn');
    const newUserBtn = document.querySelector('#new-users-btn');
    if (newUserBtn) {
        newUserBtn.addEventListener('click', async () => {
            setLoadingState(true);
            clearUserCards();
            setErrorState();
            await fetchAndRenderUsers();
            setLoadingState(false);
        });
    }
    if (refreshBtn) {
        refreshBtn.addEventListener('click', async () => {
            setLoadingState(true);
            await refreshAllUsersWeather();
            setLoadingState(false);
        });
    }
}
