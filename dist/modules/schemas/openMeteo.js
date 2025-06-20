import z from 'zod';
import { ZOD_MESSAGES } from '../constants/zodMessages';
const CurrentWeatherSchema = z.object({
    temperature_2m: z.number().min(-20, { message: ZOD_MESSAGES.temperatureMin }).max(40, { message: ZOD_MESSAGES.temperatureMax }),
    relative_humidity_2m: z.number().min(0, { message: ZOD_MESSAGES.humidityMin }).max(100, { message: ZOD_MESSAGES.humidityMax }),
    weather_code: z.number().int({ message: ZOD_MESSAGES.weatherCodeInt }),
});
export const OpenMeteoResponseSchema = z.object({
    current: CurrentWeatherSchema,
});
