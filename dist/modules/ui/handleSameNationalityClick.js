import { getUsersInfo } from '../api/randomuser.js';
import { enrichUserWithWeather } from '../workflows/workflowHelper.js';
import { renderUserCards } from '../display/renderCards.js';
import { USERS_CACHED_KEY } from '../constants.js';
import { saveToLocalStorage } from '../helpers/localStorage.js';
export async function handleSameNationalityClick(user, users) {
    const targetNationality = user.nationality;
    const indexesToReplace = [];
    for (let i = 0; i < users.length; i++) {
        if (users[i].nationality !== targetNationality) {
            indexesToReplace.push(i);
        }
    }
    if (indexesToReplace.length === 0)
        return;
    const newUsers = await getUsersInfo({
        userCount: indexesToReplace.length,
        nationality: targetNationality,
    });
    const enrichedNewUsers = await Promise.all(newUsers.map(enrichUserWithWeather));
    indexesToReplace.forEach((value, index) => {
        users[value] = enrichedNewUsers[index];
    });
    renderUserCards(users);
    saveToLocalStorage(USERS_CACHED_KEY, users);
}
