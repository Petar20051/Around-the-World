import { refreshAllUsersWeather } from '../workflows/refreshWeather.js';
import { fetchAndRenderUsers } from '../workflows/fetchAndRenderUsers.js';
import { setLoadingState } from '../ui/loader.js';
import { clearUserCards } from '../display/clearUserCards.js';
import { setErrorState } from '../ui/error.js';

export function initButtonHandlers() {
    const refreshBtn = document.getElementById('refresh-btn');
    const newUserBtn = document.getElementById('new-users-btn');

    newUserBtn.addEventListener('click', async () => {
        setLoadingState(true);
        clearUserCards();
        setErrorState();
        await fetchAndRenderUsers();
        setLoadingState(false);
    });

    refreshBtn.addEventListener('click', async () => {
        setLoadingState(true);
        await refreshAllUsersWeather();
        setLoadingState(false);
    });
}