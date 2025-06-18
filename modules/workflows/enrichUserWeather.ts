import {fetchCoordinatesByLocation} from '../api/opencage.js';
import {fetchCurrentWeatherStats} from '../api/openmeteo.js';
import {User} from '../types/user.js';

async function getCoordinatesIfNeeded(user: User, alwaysFetch: boolean): Promise<User> {
	const updatedUser = {...user};

	if (alwaysFetch || !user.coordinates) {
		try {
			const coords = await fetchCoordinatesByLocation(user.city, user.country);
			updatedUser.coordinates = coords;
		} catch (error) {
			console.warn(`Failed to fetch coordinates for ${user.fullName}:`, error);
			if (alwaysFetch) return updatedUser;
		}
	}

	return updatedUser;
}

async function getWeatherIfPossible(user: User): Promise<User> {
	const updatedUser = {...user};

	if (user.coordinates) {
		try {
			const weather = await fetchCurrentWeatherStats(user.coordinates.lat, user.coordinates.lng);
			updatedUser.weather = weather;
		} catch (error) {
			console.warn(`Failed to fetch weather for ${user.fullName}:`, error);
			updatedUser.weather = undefined;
		}
	}

	return updatedUser;
}

export async function enrichUserWeather(user: User, alwaysFetchCoordinates = false): Promise<User> {
	let updatedUser = await getCoordinatesIfNeeded(user, alwaysFetchCoordinates);
	updatedUser = await getWeatherIfPossible(updatedUser);
	return updatedUser;
}
