import {renderUserCards} from '../display/renderCards.js';
import {getUsersInfo} from '../api/randomuser.js';
import {saveToLocalStorage} from '../helpers/localStorage.js';
import {USERS_CACHED_KEY} from '../constants.js';
import {setErrorState} from '../ui/error.js';
import {enrichUserWithWeather} from './workflowHelper.js';
import {User} from '../types/user.js';

export async function fetchAndRenderUsers(): Promise<void> {
	try {
		const users: User[] = await getUsersInfo({});
		const updatedUsers = await Promise.all(users.map(enrichUserWithWeather));
		saveToLocalStorage(USERS_CACHED_KEY, updatedUsers);
		renderUserCards(updatedUsers);
	} catch (error) {
		console.error('Workflow error during user/weather fetch:');
		setErrorState('Workflow error during user/weather fetch');
	}
}
