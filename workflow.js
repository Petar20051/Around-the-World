import { getUsersInfo } from "./modules/randomUserAPI.js";
import { getCoordinates } from "./modules/openCageAPI.js";
import { getWeatherStats } from "./modules/openMeteoAPI.js";
import { displayCards } from "./modules/displayCards.js";
import { updateWeatherInfo } from "./modules/updateWeather.js"


async function runWorkflow() {
  showLoader();
  try {
    localStorage.removeItem("cachedUsers");
    const users = await getUsersInfo();
    const usersWithWeathers = await Promise.all(users.map(async (user) => {
      const coordinates = await getCoordinates(user.city, user.country);
      const weather = await getWeatherStats(coordinates.lat, coordinates.lng);
      /*console.log(weather);*/
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
  }
}

async function refreshWeatherOnly() {
  showLoader();
  try {
    const cachedInfo = localStorage.getItem("cachedUsers");
    if (!cachedInfo) return;
    let currentUsers = JSON.parse(cachedInfo);
    const usersWithUpdatedWeathers = await Promise.all(currentUsers.map(async (user) => {
      if (!user.weather) throw new Error("Cached coordinates missing");
      const weather = await getWeatherStats(user.weather.latitude, user.weather.longitude,2);
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
  }finally
  {
    hideLoader();
  }

}

const loader = document.getElementById("loader-container");
const refreshBtn = document.getElementById("refresh-btn");
const newUserBtn = document.getElementById("new-users-btn");
const cardsContainer = document.querySelector(".cards-container")

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

newUserBtn.addEventListener("click", runWorkflow);
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