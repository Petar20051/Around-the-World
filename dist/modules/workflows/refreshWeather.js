import { updateWeatherFieldsOnCards } from '../display/updateCardFields.js';
import { saveToLocalStorage, loadFromLocalStorage } from '../helpers/localStorage.js';
import { USERS_CACHED_KEY } from '../constants.js';
import { setErrorState } from '../ui/error.js';
import { clearUserCards } from '../display/clearUserCards.js';
import { enrichUserWeather } from './enrichUserWeather.js';
export async function refreshAllUsersWeather() {
    const currentUsers = loadFromLocalStorage(USERS_CACHED_KEY);
    if (!currentUsers) {
        clearUserCards();
        setErrorState('No users available for weather update');
        return;
    }
    let updatedUsers = [];
    try {
        updatedUsers = await Promise.all(currentUsers.map((u) => enrichUserWeather({ user: u, alwaysFetchCoordinates: false })));
        updateWeatherFieldsOnCards(updatedUsers);
    }
    catch (err) {
        console.error('Error refreshing weather data:', err);
    }
    finally {
        saveToLocalStorage({ key: USERS_CACHED_KEY, value: updatedUsers });
    }
}
