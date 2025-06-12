import { refreshWeatherOnly } from '../workflows/refreshWeather.js';
import { runWorkflow } from '../workflows/fetchAndRenderUsers.js';

export function setButtons() {
    const refreshBtn = document.getElementById('refresh-btn');
    const newUserBtn = document.getElementById('new-users-btn');

    newUserBtn.addEventListener('click', runWorkflow);
    refreshBtn.addEventListener('click', refreshWeatherOnly);
}