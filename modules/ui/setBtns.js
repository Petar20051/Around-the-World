import { refreshWeatherOnly } from '../workflows/refreshWeatherOnly.js';
import { runWorkflow } from '../workflows/runWorkflow.js';

export function setButtons() {
    const refreshBtn = document.getElementById('refresh-btn');
    const newUserBtn = document.getElementById('new-users-btn');

    newUserBtn.addEventListener('click', runWorkflow);
    refreshBtn.addEventListener('click', refreshWeatherOnly);
}