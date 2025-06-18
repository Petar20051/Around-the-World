import { updateFieldIfChanged } from '../helpers/dom.js';
export function updateWeatherFieldsOnCards(users) {
    const cards = document.querySelectorAll('.card');
    users.forEach((user, index) => {
        const card = cards[index];
        if (!card)
            return;
        const tempText = user.weather ? `Temp: ${user.weather.temperature} °C` : 'Weather unavailable';
        const humidityText = user.weather ? `Humidity: ${user.weather.humidity} %` : '';
        const conditionText = user.weather ? `Condition: ${user.weather.condition}` : '';
        updateFieldIfChanged({ card: card, selector: '.temperature', newValue: tempText });
        updateFieldIfChanged({ card: card, selector: '.humidity', newValue: humidityText });
        updateFieldIfChanged({ card: card, selector: '.condition', newValue: conditionText });
    });
}
