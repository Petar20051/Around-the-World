export function updateWeatherInfo(users){
const cards = document.querySelectorAll(".card");
users.forEach((user,index)=>
{
    const card=cards[index];
    if(!card)return;

    const temp = card.querySelector(".temperature");
    temp.textContent="Temp: "+user.weather.temperature+" °C";

    const humidity = card.querySelector(".humidity");
    humidity.textContent="Humidity: " +user.weather.humidity+" %";

    const condition = card.querySelector("condition");
    condition.textContent="Condition: "+user.weather.weatherDescription;
});
}