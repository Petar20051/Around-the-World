import { API_RANDOMUSER_URL } from '../constants.js';
import { fetchJSON } from '../helpers/fetch.js';
import { buildUrl } from '../helpers/queryBuilder.js';

export async function getUsersInfo({ userCount = 5, nationality = null }) {
    const requestUrl = buildUrl(API_RANDOMUSER_URL, {
        results: userCount,
        nat: nationality
    });

    const data = await fetchJSON(requestUrl, 'RandomUser API fetch error:');

    const users = data.results.map(user => ({
        picture: user.picture.thumbnail,
        fullName: `${user.name.first} ${user.name.last}`,
        city: user.location.city,
        country: user.location.country,
        nationality: user.nat
    }));

    return users;
}
