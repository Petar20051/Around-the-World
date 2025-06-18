import { fetchCoordinatesByLocation } from '../api/opencage.js';
import { fetchCurrentWeatherStats } from '../api/openmeteo.js';
export async function enrichUserWithWeather(user) {
    let coordinates;
    let weather;
    try {
        coordinates = await fetchCoordinatesByLocation(user.city, user.country);
    }
    catch (error) {
        console.warn(`Failed to fetch coordinates for ${user.fullName}:`);
    }
    if (coordinates) {
        try {
            weather = await fetchCurrentWeatherStats(coordinates.lat, coordinates.lng);
        }
        catch (error) {
            console.warn(`Failed to fetch weather for ${user.fullName}:`);
        }
    }
    const enrichedUser = { ...user };
    if (coordinates)
        enrichedUser.coordinates = coordinates;
    if (weather)
        enrichedUser.weather = weather;
    return enrichedUser;
}
export async function refreshUserWeather(user) {
    if (!user.coordinates) {
        console.warn(`${user.fullName} has no coordinates.`);
        return { ...user };
    }
    let weather;
    try {
        weather = await fetchCurrentWeatherStats(user.coordinates.lat, user.coordinates.lng);
    }
    catch (error) {
        console.warn(`Failed to refresh weather for ${user.fullName}:`);
    }
    const updatedUser = { ...user, weather };
    return updatedUser;
}
