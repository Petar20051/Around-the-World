import {updateWeatherFieldsOnCards} from '../display/updateCardFields.js';
import {saveToLocalStorage, loadFromLocalStorage} from '../helpers/localStorage.js';

import {setErrorState} from '../ui/error.js';
import {clearUserCards} from '../display/clearUserCards.js';
import {enrichUserWeather} from './enrichUserWeather.js';
import {User} from '../types/user.js';
import {USERS_CACHED_KEY} from '../constants/defaults.js';
import {ERROR_MESSAGES} from '../constants/errorMessages.js';

export async function refreshAllUsersWeather(): Promise<void> {
	const users = loadFromLocalStorage<User[]>(USERS_CACHED_KEY);

	if (!users) {
		clearUserCards();
		setErrorState(ERROR_MESSAGES.REFRESH_UNAVAILABLE);
		return;
	}

	try {
		const enrichedUsers = await Promise.all(users.map(enrichUserWeather));
		updateWeatherFieldsOnCards(enrichedUsers);
		saveToLocalStorage({key: USERS_CACHED_KEY, value: enrichedUsers});
	} catch (error) {
		console.error('Error refreshing weather data:', error);
	}
}
