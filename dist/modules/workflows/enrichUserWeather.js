import { fetchCoordinatesByLocation } from '../api/opencage.js';
import { fetchCurrentWeatherStats } from '../api/openmeteo.js';
export async function enrichUserWeather(user) {
    const userWithCoordinates = await addCoordinatesIfMissing(user);
    return await addWeatherIfCoordinatesExist(userWithCoordinates);
}
async function addCoordinatesIfMissing(user) {
    if (user.coordinates)
        return user;
    try {
        const coordinates = await fetchCoordinatesByLocation({ city: user.city, country: user.country });
        return { ...user, coordinates };
    }
    catch (error) {
        console.warn(`Failed to fetch coordinates for ${user.fullName}:`, error);
        return user;
    }
}
async function addWeatherIfCoordinatesExist(user) {
    if (!user.coordinates)
        return user;
    try {
        const weather = await fetchCurrentWeatherStats({
            latitude: user.coordinates.lat,
            longitude: user.coordinates.lng,
        });
        return { ...user, weather };
    }
    catch (error) {
        console.warn(`Failed to fetch weather for ${user.fullName}:`, error);
        return { ...user, weather: undefined };
    }
}
