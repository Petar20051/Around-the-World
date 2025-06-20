import {renderUserCards} from '../display/renderCards.js';
import {getUsersInfo} from '../api/randomuser.js';
import {saveToLocalStorage} from '../helpers/localStorage.js';
import {USERS_CACHED_KEY, WORKFLOW_ERROR_MSG} from '../constants.js';
import {setErrorState} from '../ui/error.js';
import {enrichUserWeather} from './enrichUserWeather.js';

export async function fetchAndRenderUsers(): Promise<void> {
	try {
		const users = await getUsersInfo({});
		const enrichedUsers = await Promise.all(users.map((user) => enrichUserWeather(user)));
		saveToLocalStorage({key: USERS_CACHED_KEY, value: enrichedUsers});
		renderUserCards(enrichedUsers);
	} catch (error) {
		console.error(WORKFLOW_ERROR_MSG, error);
		setErrorState(WORKFLOW_ERROR_MSG);
	}
}
