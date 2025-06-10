import { API_KEY_OpenCageAPI } from "./config.js";
import { api_opencage_url } from "./config.js";

export async function getCoordinates(city,country) {
 
  const query= city+", "+country;
  const request_url = api_opencage_url
    + '?'
    + 'key=' + API_KEY_OpenCageAPI
    + '&q=' + encodeURIComponent(query)
    + '&pretty=1'
    + '&no_annotations=1';

    try{
    let response = await fetch(request_url);
    if(!response.ok) throw new Error("OpenCage API HTTP error: "+response.status);
    const data = await response.json();
    if(!data.results || data.results.length===0){throw new Error("No coordinates found for "+query)}
    const {lat,lng} = data.results[0].geometry;
    return {lat,lng};  
    }
    catch(error){
        console.log("OpenCage API fetch error:",error.message);
    }

}

  /* example for right URL https://api.opencagedata.com/geocode/v1/json?q=Weimar%2C+Germany&key=ea4ce79728ef4268af7e1f9b93a0cfe2 */

