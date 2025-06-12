import { createCards } from './modules/display/renderCards.js';
import { loadFromLocalStorage } from './modules/helpers/localStorage.js';
import { USERS_CACHED_KEY } from './modules/constants.js';
import { setButtons } from './modules/ui/bindButtons.js';
import { runWorkflow } from './modules/workflows/fetchAndRenderUsers.js';
import { refreshWeatherOnly } from './modules/workflows/refreshWeather.js';


setButtons();

const cachedUsersInfo = loadFromLocalStorage(USERS_CACHED_KEY);
if (cachedUsersInfo) {
  createCards(cachedUsersInfo);
} else {
  runWorkflow();
}

setInterval(refreshWeatherOnly, 30 * 60 * 1000);