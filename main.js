import { createCards } from './modules/display/createCards.js';
import { loadFromLocalStorage } from './modules/helpers/localSorage.js';
import { USERS_CACHED_KEY } from './modules/static.js';
import { setButtons } from './modules/ui/setBtns.js';
import { runWorkflow } from './modules/workflows/runWorkflow.js';
import { refreshWeatherOnly } from './modules/workflows/refreshWeatherOnly.js';


setButtons();

const cachedUsersInfo = loadFromLocalStorage(USERS_CACHED_KEY);
if (cachedUsersInfo) {
  createCards(cachedUsersInfo);
} else {
  runWorkflow();
}

setInterval(refreshWeatherOnly, 30 * 60 * 1000);