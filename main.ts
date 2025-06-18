import {renderUserCards} from './modules/display/renderCards.js';
import {loadFromLocalStorage} from './modules/helpers/localStorage.js';
import {USERS_CACHED_KEY} from './modules/constants.js';
import {initButtonHandlers} from './modules/ui/bindButtons.js';
import {fetchAndRenderUsers} from './modules/workflows/fetchAndRenderUsers.js';
import {refreshAllUsersWeather} from './modules/workflows/refreshWeather.js';
import {User} from './modules/types.js';

(function initApp() {
	const cachedUsersInfo = loadFromLocalStorage<User[]>(USERS_CACHED_KEY);
	if (cachedUsersInfo) {
		renderUserCards(cachedUsersInfo);
	} else {
		fetchAndRenderUsers();
	}

	initButtonHandlers();

	setInterval(refreshAllUsersWeather, 30 * 60 * 1000);
})();
