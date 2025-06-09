
export async function getCoordinates(city,country) {
 
  const query = city+", "+country;
  const api_url = 'https://api.opencagedata.com/geocode/v1/json'
  const api_key ="ea4ce79728ef4268af7e1f9b93a0cfe2"

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
    const locations = data.results.map(location =>(
    {
        lat:location.geometry.lat,
        lng:location.geometry.lng
    }
    ))
    console.log(locations);
    return locations;  
    }
    catch(error){
        console.log("Error fetching location statistics:",error);
    }

}

  /* example for right URL https://api.opencagedata.com/geocode/v1/json?q=Weimar%2C+Germany&key=ea4ce79728ef4268af7e1f9b93a0cfe2 */

