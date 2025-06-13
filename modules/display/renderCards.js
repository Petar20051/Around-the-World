import { createElement } from '../helpers/dom.js';
import { handleSameNationalityClick } from '../ui/handleSameNationalityClick.js';
import { setLoadingState } from '../ui/loader.js';

export function renderUserCards(users) {
    const container = document.querySelector('.card-list');
    container.innerHTML = "";

    const fragment = document.createDocumentFragment();

    users.forEach((user, index) => {
        const card = createElement('div', 'card');

        const img = createElement('img');
        img.src = user.picture;

        const name = createElement('h3', 'name', user.fullName);
        const location = createElement('h4', 'location', `${user.city}, ${user.country}`);
        const temp = createElement('p', 'temperature', user.weather ? `Temp: ${user.weather.temperature} °C` : 'Weather unavailable');
        const humidity = createElement('p', 'humidity', user.weather ? `Humidity: ${user.weather.humidity} %` : '');
        const condition = createElement('p', 'condition', user.weather ? `Condition: ${user.weather.weatherDescription}` : '');
        const btnSameNationality = createElement('a', 'btn', 'Same nationality');
        btnSameNationality.addEventListener('click', async () => {
            setLoadingState(true);
            await handleSameNationalityClick(user, users);
            setLoadingState(false);
        });

        card.append(img, name, location, temp, humidity, condition, btnSameNationality);
        fragment.appendChild(card);
    });

    container.appendChild(fragment);
}