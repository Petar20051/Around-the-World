import { refreshAllUsersWeather } from '../workflows/refreshWeather.js';
import { fetchAndRenderUsers } from '../workflows/fetchAndRenderUsers.js';

export function initButtonHandlers() {
    const refreshBtn = document.getElementById('refresh-btn');
    const newUserBtn = document.getElementById('new-users-btn');

    newUserBtn.addEventListener('click', fetchAndRenderUsers);
    refreshBtn.addEventListener('click', refreshAllUsersWeather);
}

