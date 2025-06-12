import { createCards } from '../display/renderCards.js';
import { toggleLoader } from '../ui/loader.js';
import { getUsersInfo } from '../api/randomuser.js';
import { getCoordinates } from '../api/opencage.js';
import { getWeatherStats } from '../api/openmeteo.js';
import { saveToLocalStorage } from '../helpers/localStorage.js';
import { USERS_CACHED_KEY } from '../constants.js';

export async function runWorkflow() {
    toggleLoader(true);
    document.querySelector('.card-list').innerHTML = "";
    try {
        const users = await getUsersInfo();

        const usersWithWeathers = await Promise.all(users.map(async (user) => {
            try {
                const coordinates = await getCoordinates(user.city, user.country);
                const weather = await getWeatherStats(coordinates.lat, coordinates.lng);
                return { ...user, weather };
            } catch (error) {
                return { ...user, weather: null };
            }
        }));

        saveToLocalStorage(USERS_CACHED_KEY, usersWithWeathers);
        createCards(usersWithWeathers);
        handleError();
    } catch (error) {
        console.error('Workflow error during user/weather fetch:', error.message);
        handleError('Workflow error during user/weather fetch');
    } finally {
        toggleLoader(false);
    }
}