import { getUsersInfo } from '../api/randomUserAPI.js';
import { getCoordinates } from '../api/openCageAPI.js';
import { getWeatherStats } from '../api/openMeteoAPI.js';
import { saveToLocalStorage } from './localSorage.js';
import { USERS_CACHED_KEY } from '../static.js';

export async function getUsersWithWeather() {
    const users = await getUsersInfo();

    const usersWithWeathers = await Promise.all(users.map(async (user) => {
        const coordinates = await getCoordinates(user.city, user.country);
        const weather = await getWeatherStats(coordinates.lat, coordinates.lng);
        return { ...user, weather };
    }));

    saveToLocalStorage(USERS_CACHED_KEY, usersWithWeathers);
    return usersWithWeathers;
}