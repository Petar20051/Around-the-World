import { getWeatherStats } from '../api/openmeteo.js';
import { updateWeatherInfo } from '../display/updateCardFields.js';
import { saveToLocalStorage, loadFromLocalStorage } from '../helpers/localStorage.js';
import { USERS_CACHED_KEY } from '../constants.js';
import { handleError } from '../ui/error.js';
import { toggleLoader } from '../ui/loader.js';

export async function refreshWeatherOnly() {
    toggleLoader(true);
    try {
        await new Promise(res => setTimeout(res, 100));

        const currentUsers = loadFromLocalStorage(USERS_CACHED_KEY);
        if (!currentUsers) {
            return;
        }

        const usersWithUpdatedWeathers = await Promise.all(currentUsers.map(async (user) => {
            if (!user.weather || user.weather.latitude == null || user.weather.longitude == null) {
                throw new Error('Cached coordinates missing');
            }

            const weather = await getWeatherStats(user.weather.latitude, user.weather.longitude, 2);
            return { ...user, weather };
        }));

        saveToLocalStorage(USERS_CACHED_KEY, usersWithUpdatedWeathers);
        updateWeatherInfo(usersWithUpdatedWeathers);
    } catch (error) {
        console.error('Workflow error during weather refresh:', error.message);
        handleError('Workflow error during weather refresh')
    } finally {
        toggleLoader(false);
    }
}