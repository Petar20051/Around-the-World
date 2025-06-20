import { renderUserCards } from '../display/renderCards.js';
import { getUsersInfo } from '../api/randomuser.js';
import { saveToLocalStorage } from '../helpers/localStorage.js';
import { setErrorState } from '../ui/error.js';
import { enrichUserWeather } from './enrichUserWeather.js';
import { USERS_CACHED_KEY } from '../constants/defaults.js';
import { ERROR_MESSAGES } from '../constants/errorMessages.js';
export async function fetchAndRenderUsers() {
    try {
        const users = await getUsersInfo({});
        const enrichedUsers = await Promise.all(users.map((user) => enrichUserWeather(user)));
        saveToLocalStorage({ key: USERS_CACHED_KEY, value: enrichedUsers });
        renderUserCards(enrichedUsers);
    }
    catch (error) {
        console.error(ERROR_MESSAGES.WORKFLOW_ERROR, error);
        setErrorState(ERROR_MESSAGES.WORKFLOW_ERROR);
    }
}
