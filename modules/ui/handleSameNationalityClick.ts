import {getUsersInfo} from '../api/randomuser.js';
import {enrichUserWeather} from '../workflows/enrichUserWeather.js';
import {renderUserCards} from '../display/renderCards.js';
import {saveToLocalStorage} from '../helpers/localStorage.js';
import {handleSameNationalityClickParams} from '../types/params.js';
import {USERS_CACHED_KEY} from '../constants/defaults.js';

export async function handleSameNationalityClick({user, users}: handleSameNationalityClickParams): Promise<void> {
	const targetNationality = user.nationality;

	const indexesToReplace: number[] = [];
	for (let i = 0; i < users.length; i++) {
		if (users[i].nationality !== targetNationality) {
			indexesToReplace.push(i);
		}
	}

	if (indexesToReplace.length === 0) return;

	const newUsers = await getUsersInfo({
		userCount: indexesToReplace.length,
		nationality: targetNationality,
	});

	const enrichedNewUsers = await Promise.all(newUsers.map((u) => enrichUserWeather(u)));

	indexesToReplace.forEach((value, index) => {
		users[value] = enrichedNewUsers[index];
	});

	renderUserCards(users);
	saveToLocalStorage({key: USERS_CACHED_KEY, value: users});
}
