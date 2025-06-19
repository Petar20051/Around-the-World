import { RandomUserResponseSchema } from '../../validation/randomUserSchema.js';
import { API_RANDOMUSER_URL, DEFAULT_USER_COUNT } from '../constants.js';
import { fetchJSON } from '../helpers/fetch.js';
import { buildUrl } from '../helpers/queryBuilder.js';
function mapRandomUserToUser(randomUser) {
    return {
        fullName: `${randomUser.name.first} ${randomUser.name.last}`,
        city: randomUser.location.city,
        country: randomUser.location.country,
        nationality: randomUser.nat,
        picture: randomUser.picture.thumbnail,
    };
}
export async function getUsersInfo({ userCount = DEFAULT_USER_COUNT, nationality }) {
    const requestUrl = buildUrl({
        baseUrl: API_RANDOMUSER_URL,
        queryParams: {
            results: userCount,
            nat: nationality,
        },
    });
    const data = await fetchJSON({
        url: requestUrl,
        errorMsg: 'RandomUser API fetch error:',
    });
    const parsed = RandomUserResponseSchema.safeParse(data);
    if (!parsed.success) {
        throw new Error('Invalid RandomUser API response');
    }
    return parsed.data.results.map(mapRandomUserToUser);
}
