import { updateWeatherFieldsOnCards } from '../display/updateCardFields.js';
import { saveToLocalStorage, loadFromLocalStorage } from '../helpers/localStorage.js';
import { USERS_CACHED_KEY } from '../constants.js';
import { setErrorState } from '../ui/error.js';
import { setLoadingState } from '../ui/loader.js';
import { refreshUserWeather } from './workflowHelper.js';
import { clearUserCards } from '../display/clearUserCards.js';

export async function refreshAllUsersWeather() {
    const currentUsers = loadFromLocalStorage(USERS_CACHED_KEY);
    if (!currentUsers) {
        clearUserCards();
        setErrorState("There are no users to refresh weather");
        return;
    }

    let usersWithUpdatedWeathers;
    try {
        usersWithUpdatedWeathers = await Promise.all(currentUsers.map(refreshUserWeather));
        updateWeatherFieldsOnCards(usersWithUpdatedWeathers);
    } catch (err) {
        console.error('Error refreshing weather data:', err);
    } finally {
        saveToLocalStorage(USERS_CACHED_KEY, usersWithUpdatedWeathers);
    }

}
