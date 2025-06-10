import { api_randomeuser_url } from "./config.js";

export async function getUsersInfo() {
    try{
    const resultCount="result=5";
    let response = await fetch(api_randomeuser_url+resultCount);
    if(!response.ok) throw new Error("RandomUser API HTTP error:" + response.status);
    const data = await response.json();
    const users = data.results.map(user =>(
    {
        picture:user.picture.thumbnail,
        fullName:user.name.first+" "+user.name.last,
        city:user.location.city,
        country:user.location.country
    }
    ))
    console.log(users);
    return users;  
    }
    catch(error){
        console.log("RandomUser API fetch error:", error.message);
    }
}


