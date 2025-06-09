export async function getUsersInfo() {
    try{
    let response = await fetch("https://randomuser.me/api/?results=5");
    if(!response.ok) throw new Error("HTTP problem");
    const data = await response.json();
    const users = data.results.map(user =>(
    {
        picture:user.picture.thumbnail,
        firstName:user.name.first,
        lastName:user.name.last,
        city:user.location.city,
        country:user.location.country
    }
    ))
    console.log(users);
    return users;  
    }
    catch(error){
        console.log("Error fetching users:",error);
    }
}


