//@ts-ignore
import z from 'https://esm.sh/zod';

export const CurrentWeatherSchema = z.object({
	temperature_2m: z.number(),
	relative_humidity_2m: z.number(),
	weather_code: z.number(),
});

export const OpenMeteoResponseSchema = z.object({
	current: CurrentWeatherSchema,
});

export type OpenMeteoResponse = z.infer<typeof OpenMeteoResponseSchema>;
