import { api_open_meteo_url } from "./config.js";

export async function getWeatherStats(latitude, longitude, retries = 3) {
  const request_url = api_open_meteo_url
    + '?'
    + 'latitude=' + latitude
    + '&'
    + 'longitude=' + longitude
    + '&current=temperature_2m,relative_humidity_2m,weather_code';

  try {
    const response = await fetch(request_url);
    if (!response.ok) throw new Error("Open-Meteo API HTTP error:"+response.status);
    const data = await response.json();
    const weatherStats = data.current;
    return {
      latitude: latitude,
      longitude: longitude,
      temperature: weatherStats.temperature_2m,
      humidity: weatherStats.relative_humidity_2m,
      weatherDescription: getWeatherDescription(weatherStats.weather_code)
    };
  } catch (error) {
    if (retries > 0) {
        console.log(`Open-Meteo API fetch failed for (${latitude}, ${longitude}). Retries left: ${retries}. Error: ${error.message}`)
      await new Promise(res => setTimeout(res, 500));
      return getWeatherStats(latitude, longitude, retries - 1);
    }
    console.log("Open-Meteo API fetch error:", error.message);
    throw error;
  }
}

function getWeatherDescription(weatherCode) {
  switch (weatherCode) {
    case 0: return "Clear sky";
    case 1: return "Mainly clear";
    case 2: return "Partly cloudy";
    case 3: return "Overcast";
    case 45:
    case 48: return "Fog";
    case 51:
    case 53:
    case 55: return "Drizzle";
    case 56:
    case 57: return " Freezing Drizzle";
    case 61:
    case 63:
    case 65: return "Rain";
    case 66:
    case 67: return "Freezing rain";
    case 71:
    case 73:
    case 75: return "Snow fall";
    case 77: return "Snow grains";
    case 80:
    case 81: return "Rain showers";
    case 85:
    case 86: return "Snow showers";
    case 95: return "Thunderstorm";
    case 96:
    case 99: return "Thunderstorm with slight and heavy hail";
    default: return "No information";
  }
}