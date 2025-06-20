export const API_KEY_OPENCAGE = 'ea4ce79728ef4268af7e1f9b93a0cfe2';
export const API_OPENCAGE_URL = 'https://api.opencagedata.com/geocode/v1/json';
export const API_OPENMETEO_URL = 'https://api.open-meteo.com/v1/forecast';
export const OPENMETEO_QUERY = {
    current: 'temperature_2m,relative_humidity_2m,weather_code',
};
export const API_RANDOMUSER_URL = 'https://randomuser.me/api/?';
export const USERS_CACHED_KEY = 'cachedUsers';
export const DEFAULT_USER_COUNT = 5;
export const DEFAULT_RETRIES_COUNT = 2;
export const DEFAULT_RETRY_DELAY_MS = 1000;
export const DEFAULT_RETRY_FAILED_MSG = 'Function execution failed';
export const DEFAULT_FETCH_ERROR_MSG = 'API fetch error';
export const DEFAULT_INVALID_DATA_MSG = 'Invalid data';
export const WORKFLOW_ERROR_MSG = 'Workflow error during user/weather fetch';
export const REFRESH_UNAVAILABLE = 'No users available for weather update';
export const ZOD_MESSAGES = {
    thumbnailUrl: 'Thumbnail must be a valid URL.',
    firstNameRequired: 'First name is required.',
    lastNameRequired: 'Last name is required.',
    cityRequired: 'City is required.',
    countryRequired: 'Country is required.',
    nationalityMin: 'Nationality must be at least 2 characters.',
    atLeastOneUser: 'At least one user is required.',
    temperatureMin: 'Temperature must be at least -20°C.',
    temperatureMax: 'Temperature must be under 40°C.',
    humidityMin: 'Humidity must be positive.',
    humidityMax: 'Humidity must be 100% or less.',
    weatherCodeInt: 'Weather code must be an integer.',
    latitudeMin: 'Latitude must be >= -90',
    latitudeMax: 'Latitude must be <= 90',
    longitudeMin: 'Longitude must be >= -180',
    longitudeMax: 'Longitude must be <= 180',
};
