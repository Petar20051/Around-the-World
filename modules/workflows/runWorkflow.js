import { createCards } from '../display/createCards.js';
import { toggleLoader } from '../ui/loader.js';
import { getUsersWithWeather } from '../helpers/getUsersWithWeather.js';

export async function runWorkflow() {
    toggleLoader(true);
    try {
        const usersWithWeather = await getUsersWithWeather();
        createCards(usersWithWeather);
    } catch (error) {
        console.error('Workflow error during user/weather fetch:', error.message);
    } finally {
        toggleLoader(false);
    }
}