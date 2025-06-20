import { RandomUserResponseSchema } from '../schemas/randomUser.js';
import { API_RANDOMUSER_URL, DEFAULT_USER_COUNT } from '../constants.js';
import { fetchJSON } from '../helpers/fetch.js';
import { buildUrl } from '../helpers/queryBuilder.js';
import { parseWithSchema } from '../helpers/zodUtils.js';
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
        context: 'RandomUser',
    });
    const parsedData = parseWithSchema({
        schema: RandomUserResponseSchema,
        data: data,
    });
    return parsedData.results.map(mapRandomUserToUser);
}
function mapRandomUserToUser(randomUser) {
    return {
        fullName: `${randomUser.name.first} ${randomUser.name.last}`,
        city: randomUser.location.city,
        country: randomUser.location.country,
        nationality: randomUser.nat,
        picture: randomUser.picture.thumbnail,
    };
}
