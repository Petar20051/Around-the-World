import {updateFieldIfChanged} from '../helpers/dom.js';
import {User} from '../types.js';

export function updateWeatherFieldsOnCards(users: User[]): void {
	const cards = document.querySelectorAll('.card');

	users.forEach((user, index) => {
		const card = cards[index];
		if (!card) return;

		const tempText = user.weather ? `Temp: ${user.weather.temperature} °C` : 'Weather unavailable';
		const humidityText = user.weather ? `Humidity: ${user.weather.humidity} %` : '';
		const conditionText = user.weather ? `Condition: ${user.weather.condition}` : '';

		updateFieldIfChanged(card, '.temperature', tempText);
		updateFieldIfChanged(card, '.humidity', humidityText);
		updateFieldIfChanged(card, '.condition', conditionText);
	});
}
