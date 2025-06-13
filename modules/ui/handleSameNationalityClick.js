import { getUsersInfo } from "../api/randomuser.js";
import { enrichUserWithWeather } from "../workflows/workflowHelper.js";
import { renderUserCards } from "../display/renderCards.js";
import { USERS_CACHED_KEY } from "../constants.js";
import { saveToLocalStorage } from "../helpers/localStorage.js";

export async function handleSameNationalityClick(user, users) {
    const targetNationality = user.nationality;

    const usersToReplace = [];
    users.forEach((u, i) => {
        if (u.nationality !== targetNationality) {
            usersToReplace.push(i);
        }
    });

    if (usersToReplace.length) return;


    const newUsersRaw = await getUsersInfo({ userCount: usersToReplace.length, nationality: targetNationality });
    const newUsersWithWeather = await Promise.all(newUsersRaw.map(enrichUserWithWeather));

    let i = 0;
    usersToReplace.forEach((index) => {

        if (users[index].nationality != targetNationality) {
            users[index] = newUsersWithWeather[i];
            i++;
        }
    });

    renderUserCards(users);
    saveToLocalStorage(USERS_CACHED_KEY, users);
}