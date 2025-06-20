import {RandomUserResponse, RandomUserResponseSchema, RandomUser} from '../schemas/randomUser.js';
import {API_RANDOMUSER_URL, DEFAULT_USER_COUNT} from '../constants.js';
import {fetchJSON} from '../helpers/fetch.js';
import {buildUrl} from '../helpers/queryBuilder.js';
import {getUsersInfoParams} from '../types/params.js';
import {User} from '../types/user.js';
import {parseWithSchema} from '../helpers/zodUtils.js';

export async function getUsersInfo({userCount = DEFAULT_USER_COUNT, nationality}: getUsersInfoParams): Promise<User[]> {
	const requestUrl = buildUrl({
		baseUrl: API_RANDOMUSER_URL,
		queryParams: {
			results: userCount,
			nat: nationality,
		},
	});

	const data = await fetchJSON<RandomUserResponse>({
		url: requestUrl,
		context: 'RandomUser',
	});
	const parsedData = parseWithSchema<RandomUserResponse>({
		schema: RandomUserResponseSchema,
		data: data,
	});
	return parsedData.results.map(mapRandomUserToUser);
}

function mapRandomUserToUser(randomUser: RandomUser): User {
	return {
		fullName: `${randomUser.name.first} ${randomUser.name.last}`,
		city: randomUser.location.city,
		country: randomUser.location.country,
		nationality: randomUser.nat,
		picture: randomUser.picture.thumbnail,
	};
}
