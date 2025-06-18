import { updateWeatherFieldsOnCards } from '../display/updateCardFields.js';
import { saveToLocalStorage, loadFromLocalStorage } from '../helpers/localStorage.js';
import { USERS_CACHED_KEY } from '../constants.js';
import { setErrorState } from '../ui/error.js';
import { clearUserCards } from '../display/clearUserCards.js';
import { enrichUserWeather } from './enrichUserWeather.js';
export async function refreshAllUsersWeather() {
    const users = loadFromLocalStorage(USERS_CACHED_KEY);
    if (!users) {
        clearUserCards();
        setErrorState('No users available for weather update');
        return;
    }
    try {
        const enrichedUsers = await Promise.all(users.map(enrichUserWeather));
        updateWeatherFieldsOnCards(enrichedUsers);
        saveToLocalStorage({ key: USERS_CACHED_KEY, value: enrichedUsers });
    }
    catch (error) {
        console.error('Error refreshing weather data:', error);
    }
}
