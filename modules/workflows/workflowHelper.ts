import {fetchCoordinatesByLocation} from '../api/opencage.js';
import {fetchCurrentWeatherStats} from '../api/openmeteo.js';
import {User, Coordinates, Weather} from '../types.js';

export async function enrichUserWithWeather(user: User): Promise<User> {
	let coordinates: Coordinates | undefined;
	let weather: Weather | undefined;

	try {
		coordinates = await fetchCoordinatesByLocation(user.city, user.country);
		weather = await fetchCurrentWeatherStats(coordinates.lat, coordinates.lng);
	} catch (error) {
		console.warn(`Failed to enrich user ${user.fullName}:`);
	}

	return {
		...user,
		...(coordinates && {coordinates}),
		...(weather && {weather}),
	};
}

export async function refreshUserWeather(user: User): Promise<User> {
	if (!user.coordinates) {
		console.warn(`User ${user.fullName} has no coordinates.`);
		return {...user};
	}

	let weather: Weather | undefined;
	try {
		weather = await fetchCurrentWeatherStats(user.coordinates.lat, user.coordinates.lng);
		return {
			...user,
			weather,
		};
	} catch (error) {
		console.warn(`Failed to refresh weather for ${user.fullName}:`);
		return {
			...user,
			weather,
		};
	}
}
