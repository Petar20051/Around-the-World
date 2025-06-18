import { fetchCoordinatesByLocation } from '../api/opencage.js';
import { fetchCurrentWeatherStats } from '../api/openmeteo.js';
export async function getCoordinatesIfNeeded(user) {
    const updatedUser = { ...user };
    if (!user.coordinates) {
        try {
            const coords = await fetchCoordinatesByLocation({ city: user.city, country: user.country });
            updatedUser.coordinates = coords;
        }
        catch (error) {
            console.warn(`Failed to fetch coordinates for ${user.fullName}:`, error);
        }
    }
    return updatedUser;
}
async function getWeatherIfPossible(user) {
    const updatedUser = { ...user };
    if (user.coordinates) {
        try {
            const weather = await fetchCurrentWeatherStats({ latitude: user.coordinates.lat, longitude: user.coordinates.lng });
            updatedUser.weather = weather;
        }
        catch (error) {
            console.warn(`Failed to fetch weather for ${user.fullName}:`, error);
            updatedUser.weather = undefined;
        }
    }
    return updatedUser;
}
export async function enrichUserWeather({ user, alwaysFetchCoordinates = false, }) {
    let updatedUser = await getCoordinatesIfNeeded(user);
    updatedUser = await getWeatherIfPossible(updatedUser);
    return updatedUser;
}
