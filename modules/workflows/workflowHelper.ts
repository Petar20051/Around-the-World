import {fetchCoordinatesByLocation} from '../api/opencage.js';
import {fetchCurrentWeatherStats} from '../api/openmeteo.js';
import {Coordinates} from '../types/coordinates.js';
import {User} from '../types/user.js';
import {Weather} from '../types/weather.js';

export async function enrichUserWithWeather(user: User): Promise<User> {
	let coordinates: Coordinates | undefined;
	let weather: Weather | undefined;

	try {
		coordinates = await fetchCoordinatesByLocation(user.city, user.country);
	} catch (error) {
		console.warn(`Failed to fetch coordinates for ${user.fullName}:`);
	}

	if (coordinates) {
		try {
			weather = await fetchCurrentWeatherStats(coordinates.lat, coordinates.lng);
		} catch (error) {
			console.warn(`Failed to fetch weather for ${user.fullName}:`);
		}
	}

	const enrichedUser: User = {...user};
	if (coordinates) enrichedUser.coordinates = coordinates;
	if (weather) enrichedUser.weather = weather;
	return enrichedUser;
}

export async function refreshUserWeather(user: User): Promise<User> {
	if (!user.coordinates) {
		console.warn(`${user.fullName} has no coordinates.`);
		return {...user};
	}

	let weather: Weather | undefined;
	try {
		weather = await fetchCurrentWeatherStats(user.coordinates.lat, user.coordinates.lng);
	} catch (error) {
		console.warn(`Failed to refresh weather for ${user.fullName}:`);
	}

	const updatedUser: User = {...user, weather};
	return updatedUser;
}
