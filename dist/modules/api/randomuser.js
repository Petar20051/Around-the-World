import { API_RANDOMUSER_URL } from '../constants.js';
import { fetchJSON } from '../helpers/fetch.js';
import { buildUrl } from '../helpers/queryBuilder.js';
export async function getUsersInfo({ userCount = 5, nationality, }) {
    const requestUrl = buildUrl({
        baseUrl: API_RANDOMUSER_URL,
        queryParams: {
            results: userCount,
            nat: nationality,
        },
    });
    const data = await fetchJSON({ url: requestUrl, errorMsg: 'RandomUser API fetch error:' });
    return data.results.map((user) => ({
        picture: user.picture.thumbnail,
        fullName: `${user.name.first} ${user.name.last}`,
        city: user.location.city,
        country: user.location.country,
        nationality: user.nat,
    }));
}
