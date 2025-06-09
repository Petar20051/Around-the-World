import { getUsersInfo } from "./modules/randomUserAPI.js";
import { getCoordinates } from "./modules/openCageAPI.js";
import { getWeatherStats } from "./modules/openMeteoAPI.js";
import { displayCards } from "./modules/displayCards.js";

let currentUsers=[];

 async function runWorkflow() {
  try{
    const users = await getUsersInfo();

    const usersWithWeathers = await Promise.all(users.map( async user =>
    {
        const coordinates = await getCoordinates(user.city,user.country);
        const weather = await getWeatherStats(coordinates.lat,coordinates.lng);
        return{
            ...user,weather
        };
    }
    ));
    currentUsers=usersWithWeathers;
   displayCards(currentUsers);
  }
  catch(error)
  {
    console.error("Workflow error:", error);
  }
}

async function refreshWeatherOnly() {
  try{
    const usersWithUpdatedWeathers = await Promise.all(currentUsers.map( async user =>
    {
        const coordinates = await getCoordinates(user.city,user.country);
        const weather = await getWeatherStats(coordinates.lat,coordinates.lng);
        return{
            ...user,weather
        };
    }
    ));
   displayCards(currentUsers);
  }
  catch(error)
  {
    console.error("Workflow error:", error);
  }
}

document.getElementById("new-users-btn").addEventListener("click",runWorkflow);
document.getElementById("refresh-btn").addEventListener("click",refreshWeatherOnly);

runWorkflow();