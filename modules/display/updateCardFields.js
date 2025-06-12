import { updateFieldIfChanged } from '../helpers/dom.js';

export function updateWeatherInfo(users) {
  const cards = document.querySelectorAll('.card');

  users.forEach((user, index) => {
    const card = cards[index];
    if (!card) {
      return;
    }

    if (user.weather) {
      updateFieldIfChanged(card, '.temperature', `Temp: ${user.weather.temperature} °C`);
      updateFieldIfChanged(card, '.humidity', `Humidity: ${user.weather.humidity} %`);
      updateFieldIfChanged(card, '.condition', `Condition: ${user.weather.weatherDescription}`);
    } else {
      updateFieldIfChanged(card, '.temperature', 'Weather unavailable');
      updateFieldIfChanged(card, '.humidity', '');
      updateFieldIfChanged(card, '.condition', '');
    }
  });
}