import { fetchCoordinatesByLocation } from "../api/opencage.js";
import { fetchCurrentWeatherStats } from "../api/openmeteo.js";

export async function enrichUserWithWeather(user) {
    let coordinates;
    let weather;

    try {
        coordinates = await fetchCoordinatesByLocation(user.city, user.country);
        weather = await fetchCurrentWeatherStats(coordinates.lat, coordinates.lng);
    } catch (error) {
        console.warn(`Failed to enrich user ${user.fullName}:`, error.message);
    }

    return {
        ...user,
        ...(coordinates && { coordinates }),
        ...(weather && { weather })
    };
}


export async function refreshUserWeather(user) {
    if (!user.coordinates) {
        console.warn(`User ${user.fullName} has no coordinates.`);
        return { ...user };
    }

    let weather;
    try {
        const { lat, lng } = user.coordinates;
        weather = await fetchCurrentWeatherStats(lat, lng);
        return {
            ...user, weather
        };
    } catch (error) {
        console.warn(`Failed to refresh weather for ${user.fullName}:`, error.message);
        return {
            ...user, weather
        }
    };
}



