import { renderUserCards } from '../display/renderCards.js';
import { setLoadingState } from '../ui/loader.js';
import { getUsersInfo } from '../api/randomuser.js';
import { saveToLocalStorage } from '../helpers/localStorage.js';
import { USERS_CACHED_KEY } from '../constants.js';
import { setErrorState } from '../ui/error.js';
import { enrichUserWithWeather } from './workflowHelper.js';
import { clearUserCards } from '../display/clearUserCards.js';

export async function fetchAndRenderUsers() {
    setLoadingState(true);
    clearUserCards();
    setErrorState();

    try {
        const users = await getUsersInfo({});
        const updatedUsers = await Promise.all(users.map(enrichUserWithWeather));
        saveToLocalStorage(USERS_CACHED_KEY, updatedUsers);
        renderUserCards(updatedUsers);
    } catch (error) {
        console.error('Workflow error during user/weather fetch:', error.message);
        setErrorState('Workflow error during user/weather fetch');
    } finally {
        setLoadingState(false);
    }
}