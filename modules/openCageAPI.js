import { API_KEY_OpenCageAPI } from "./config.js";

export async function getCoordinates(city,country) {
 
  const query = '${city}, ${country}';
  const api_url = 'https://api.opencagedata.com/geocode/v1/json';
  const api_key =API_KEY_OpenCageAPI;

  const request_url = api_url
    + '?'
    + 'key=' + api_key
    + '&q=' + encodeURIComponent(query)
    + '&pretty=1'
    + '&no_annotations=1';

    try{
    let response = await fetch(request_url);
    if(!response.ok) throw new Error("HTTP problem");
    const data = await response.json();
    if(!data.results || data.results.length===0){throw new Error("No coordinates found");}
    const {lat,lng} = data.results[0].geometry;
    console.log({lat,lng});
    return {lat,lng};  
    }
    catch(error){
        console.log("Error fetching location statistics:",error);
    }

}

  /* example for right URL https://api.opencagedata.com/geocode/v1/json?q=Weimar%2C+Germany&key=ea4ce79728ef4268af7e1f9b93a0cfe2 */

