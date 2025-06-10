
export function displayCards(users){
const container = document.querySelector(".cards-container");
container.innerHTML="";
users.forEach(user=>{
    const card = document.createElement("div");
    card.classList.add("card")

    const img=document.createElement("img");
    img.src=user.picture;
    
    const name = document.createElement("h3");
    name.classList.add("name");
    name.textContent=user.fullName;

    const location = document.createElement("h4");
    location.classList.add("location");
    location.textContent=user.city+", "+user.country;

    const temp = document.createElement("p");
    temp.classList.add("temperature");
    temp.textContent="Temp: "+user.weather.temperature+" °C";

    const humidity = document.createElement("p");
    humidity.classList.add("humidity");
    humidity.textContent="Humidity: " +user.weather.humidity+" %";

    const condition = document.createElement("p");
    condition.classList.add("condition");
    condition.textContent="Condition: "+user.weather.weatherDescription;

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(location);
    card.appendChild(temp);
    card.appendChild(humidity);
    card.appendChild(condition);

    container.appendChild(card);
})
}