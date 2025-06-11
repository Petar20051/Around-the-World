import { getUsersInfo } from "./modules/randomUserAPI.js";
import { getCoordinates } from "./modules/openCageAPI.js";
import { getWeatherStats } from "./modules/openMeteoAPI.js";
import { displayCards } from "./modules/displayCards.js";
import { updateWeatherInfo } from "./modules/updateWeather.js";

async function runWorkflow() {
  console.time("runWorkflow");
  showLoader();
  try {
    const users = await getUsersInfo();
    const usersWithWeathers = await Promise.all(users.map(async (user) => {
      const coordinates = await getCoordinates(user.city, user.country);
      const weather = await getWeatherStats(coordinates.lat, coordinates.lng);
      return {
        ...user,
        weather
      };
    }));
    localStorage.setItem("cachedUsers", JSON.stringify(usersWithWeathers));
    displayCards(usersWithWeathers);
  } catch (error) {
    console.error("Workflow error during user/weather fetch:", error.message);
  } finally {
    hideLoader();
    console.timeEnd("runWorkflow");
  }
}

async function updateWorkflow() {
  console.time("updateWorkflow");
  showLoader();
  try {
    const users = await getUsersInfo();
    const usersWithWeathers = await Promise.all(users.map(async (user) => {
      const coordinates = await getCoordinates(user.city, user.country);
      const weather = await getWeatherStats(coordinates.lat, coordinates.lng);
      return {
        ...user,
        weather
      };
    }));
    localStorage.setItem("cachedUsers", JSON.stringify(usersWithWeathers));

    const currentCardCount = document.querySelectorAll(".card").length;
    if (currentCardCount === usersWithWeathers.length) {
      updateCards(usersWithWeathers);
    } else {
      displayCards(usersWithWeathers);
    }
  } catch (error) {
    console.error("Workflow error during user/weather update:", error.message);
  } finally {
    hideLoader();
    console.timeEnd("updateWorkflow");
  }
}

async function refreshWeatherOnly() {
  console.time("refreshWeatherOnly");
  showLoader();
  try {
    const cachedInfo = localStorage.getItem("cachedUsers");
    if (!cachedInfo) return;
    let currentUsers = JSON.parse(cachedInfo);
    const usersWithUpdatedWeathers = await Promise.all(currentUsers.map(async (user) => {
      if (!user.weather || user.weather.latitude == null || user.weather.longitude == null)
        throw new Error("Cached coordinates missing");
      const weather = await getWeatherStats(user.weather.latitude, user.weather.longitude, 2);
      console.log(weather);
      return {
        ...user,
        weather
      };
    }));
    localStorage.setItem("cachedUsers", JSON.stringify(usersWithUpdatedWeathers));
    updateWeatherInfo(usersWithUpdatedWeathers);
  } catch (error) {
    console.error("Workflow error during weather refresh:", error.message);
  } finally {
    hideLoader();
    console.timeEnd("refreshWeatherOnly");
  }
}

function updateCards(users) {
  const cards = document.querySelectorAll(".card");

  users.forEach((user, index) => {
    const card = cards[index];
    if (!card) return;

    card.querySelector("img").src = user.picture;
    card.querySelector(".name").textContent = user.fullName;
    card.querySelector(".location").textContent = `${user.city}, ${user.country}`;
    card.querySelector(".temperature").textContent = `Temp: ${user.weather.temperature} °C`;
    card.querySelector(".humidity").textContent = `Humidity: ${user.weather.humidity} %`;
    card.querySelector(".condition").textContent = `Condition: ${user.weather.weatherDescription}`;
  });
}

const loader = document.getElementById("loader-container");
const refreshBtn = document.getElementById("refresh-btn");
const newUserBtn = document.getElementById("new-users-btn");
const cardsContainer = document.querySelector(".cards-container");

function showLoader() {
  loader.classList.remove("hidden");
  refreshBtn.disabled = true;
  newUserBtn.disabled = true;
  cardsContainer.classList.add("hidden");
}

function hideLoader() {
  loader.classList.add("hidden");
  refreshBtn.disabled = false;
  newUserBtn.disabled = false;
  cardsContainer.classList.remove("hidden");
}

newUserBtn.addEventListener("click", updateWorkflow);
refreshBtn.addEventListener("click", refreshWeatherOnly);

const cachedUsersInfo = localStorage.getItem("cachedUsers");
if (cachedUsersInfo) {
  displayCards(JSON.parse(cachedUsersInfo));
} else {
  runWorkflow();
}

setInterval(() => {
  refreshWeatherOnly();
}, 30 * 60 * 1000);
