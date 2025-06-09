import { getUsersInfo } from "./modules/randomUserAPI.js";
import { getCoordinates } from "./modules/openCageAPI.js";
import { getWeatherStats } from "./modules/openMeteoAPI.js";

 async function runWorkflow() {
getUsersInfo();
getCoordinates("Berlin","Germany");
getWeatherStats(52.52,13.40);


}


runWorkflow();