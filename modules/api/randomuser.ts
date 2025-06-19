import {RandomUserResponse, RandomUserResponseSchema, RandomUser} from '../../validation/randomUserSchema.js';
import {API_RANDOMUSER_URL, DEFAULT_USER_COUNT} from '../constants.js';
import {fetchJSON} from '../helpers/fetch.js';
import {buildUrl} from '../helpers/queryBuilder.js';
import {getUsersInfoParams} from '../types/paramsTypes.js';
import {User} from '../types/user.js';

function mapRandomUserToUser(randomUser: RandomUser): User {
	return {
		fullName: `${randomUser.name.first} ${randomUser.name.last}`,
		city: randomUser.location.city,
		country: randomUser.location.country,
		nationality: randomUser.nat,
		picture: randomUser.picture.thumbnail,
	};
}

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
		errorMsg: 'RandomUser API fetch error:',
	});
	const parsed = RandomUserResponseSchema.safeParse(data);

	if (!parsed.success) {
		throw new Error('Invalid RandomUser API response');
	}

	return parsed.data.results.map(mapRandomUserToUser);
}
