import { createElement } from '../helpers/dom.js';

export function createCards(users) {
    const container = document.querySelector('.card-list');
    container.innerHTML = "";
    users.forEach(user => {
        const card = createElement('div', 'card');

        const img = createElement('img');
        img.src = user.picture;

        const name = createElement('h3', 'name', user.fullName);

        const location = createElement('h4', 'location', `${user.city}, ${user.country}`);

        const temp = createElement('p', 'temperature', `Temp: ${user.weather.temperature} °C`);

        const humidity = createElement('p', 'humidity', `Humidity: ${user.weather.humidity} %`);

        const condition = createElement('p', 'condition', `Condition: ${user.weather.weatherDescription}`);

        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(location);
        card.appendChild(temp);
        card.appendChild(humidity);
        card.appendChild(condition);

        container.appendChild(card);
    });
}