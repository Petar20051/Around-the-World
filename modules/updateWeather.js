export function updateWeatherInfo(users){
const cards = document.querySelectorAll(".cards");
users.forEach((user,index)=>
{
    const card=cards[index];
    if(!card)return;

    const temp = document.querySelector(".temperature");
    temp.textContent="Temp: "+user.weather.temperature+" °C";

    const humidity = document.querySelector(".humidity");
    humidity.textContent="Humidity: " +user.weather.humidity+" %";

    const condition = document.querySelector("condition");
    condition.textContent="Condition: "+user.weather.weatherDescription;
});
}