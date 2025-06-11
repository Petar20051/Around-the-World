export function updateWeatherInfo(users) {
  const cards = document.querySelectorAll(".card");

  users.forEach((user, index) => {
    const card = cards[index];
    if (!card) return;

    const tempEl = card.querySelector(".temperature");
    const newTemp = `Temp: ${user.weather.temperature} °C`;
    if (tempEl.textContent !== newTemp) {
      tempEl.textContent = newTemp;
    }

    const humidityEl = card.querySelector(".humidity");
    const newHumidity = `Humidity: ${user.weather.humidity} %`;
    if (humidityEl.textContent !== newHumidity) {
      humidityEl.textContent = newHumidity;
    }

    const conditionEl = card.querySelector(".condition");
    const newCondition = `Condition: ${user.weather.weatherDescription}`;
    if (conditionEl.textContent !== newCondition) {
      conditionEl.textContent = newCondition;
    }
  });
}
