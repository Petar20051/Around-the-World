import { API_RANDOMUSER_URL } from '../static.js';
import { fetchJSON } from '../helpers/fetchHelper.js';

export async function getUsersInfo(userCount = 5) {
    const request_url = `${API_RANDOMUSER_URL}${userCount}`;
    const data = await fetchJSON(request_url, 'RandomUser API fetch error:');
    const users = data.results.map(user => (
        {
            picture: user.picture.thumbnail,
            fullName: `${user.name.first} ${user.name.last}`,
            city: user.location.city,
            country: user.location.country
        }
    ))
    return users;
}


