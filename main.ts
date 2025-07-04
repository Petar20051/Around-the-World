import {renderUserCards} from './modules/display/renderCards.js';
import {loadFromLocalStorage} from './modules/helpers/localStorage.js';
import {initButtonHandlers} from './modules/ui/bindButtons.js';
import {fetchAndRenderUsers} from './modules/workflows/fetchAndRenderUsers.js';
import {refreshAllUsersWeather} from './modules/workflows/refreshWeather.js';
import {User} from './modules/types/user.js';
import {USERS_CACHED_KEY} from './modules/constants/defaults.js';

(function initApp(): void {
	const cachedUsersInfo = loadFromLocalStorage<User[]>(USERS_CACHED_KEY);
	if (cachedUsersInfo) {
		renderUserCards(cachedUsersInfo);
	} else {
		fetchAndRenderUsers();
	}

	initButtonHandlers();

	setInterval(refreshAllUsersWeather, 30 * 60 * 1000);
})();
