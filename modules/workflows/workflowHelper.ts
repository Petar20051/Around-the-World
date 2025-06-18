import {fetchCoordinatesByLocation} from '../api/opencage.js';
import {fetchCurrentWeatherStats} from '../api/openmeteo.js';
import {User} from '../types/user.js';

export async function enrichUserWithWeather(user: User): Promise<User> {
	const enrichedUser: User = {...user};

	try {
		const coordinates = await fetchCoordinatesByLocation(user.city, user.country);
		enrichedUser.coordinates = coordinates;

		try {
			const weather = await fetchCurrentWeatherStats(coordinates.lat, coordinates.lng);
			enrichedUser.weather = weather;
		} catch (weatherError) {
			console.warn(`Failed to fetch weather for ${user.fullName}:`, weatherError);
		}
	} catch (coordError) {
		console.warn(`Failed to fetch coordinates for ${user.fullName}:`, coordError);
	}

	return enrichedUser;
}

export async function updateUserWeather(originalUser: User): Promise<User> {
	if (!originalUser.coordinates) {
		console.warn(`${originalUser.fullName} has no coordinates.`);
		return originalUser;
	}

	const userWithUpdatedWeather: User = {...originalUser};

	try {
		const currentWeather = await fetchCurrentWeatherStats(originalUser.coordinates.lat, originalUser.coordinates.lng);
		userWithUpdatedWeather.weather = currentWeather;
	} catch (error) {
		console.warn(`Failed to refresh weather for ${originalUser.fullName}:`, error);
		userWithUpdatedWeather.weather = undefined;
	}

	return userWithUpdatedWeather;
}
