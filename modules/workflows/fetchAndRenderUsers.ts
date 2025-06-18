import {renderUserCards} from '../display/renderCards.js';
import {getUsersInfo} from '../api/randomuser.js';
import {saveToLocalStorage} from '../helpers/localStorage.js';
import {USERS_CACHED_KEY} from '../constants.js';
import {setErrorState} from '../ui/error.js';
import {enrichUserWeather} from './enrichUserWeather.js';

export async function fetchAndRenderUsers(): Promise<void> {
	try {
		const users = await getUsersInfo({});
		const enrichedUsers = await Promise.all(users.map((u) => enrichUserWeather({user: u, alwaysFetchCoordinates: true})));
		saveToLocalStorage({key: USERS_CACHED_KEY, value: enrichedUsers});
		renderUserCards(enrichedUsers);
	} catch (error) {
		console.error('Workflow error during user/weather fetch:', error);
		setErrorState('Workflow error during user/weather fetch');
	}
}
