import {API_RANDOMUSER_URL} from '../constants.js';
import {fetchJSON} from '../helpers/fetch.js';
import {buildUrl} from '../helpers/queryBuilder.js';
import {RandomUserResponse, User} from '../types/user.js';

export async function getUsersInfo({userCount = 5, nationality}: {userCount?: number; nationality?: string}): Promise<User[]> {
	const requestUrl = buildUrl(API_RANDOMUSER_URL, {
		results: userCount,
		nat: nationality,
	});

	const data = await fetchJSON<RandomUserResponse>(requestUrl, 'RandomUser API fetch error:');

	return data.results.map((user) => ({
		picture: user.picture.thumbnail,
		fullName: `${user.name.first} ${user.name.last}`,
		city: user.location.city,
		country: user.location.country,
		nationality: user.nat,
	}));
}
