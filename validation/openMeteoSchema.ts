//@ts-ignore
import z from 'https://esm.sh/zod';

export const OpenMeteoResponseSchema = z.object({
	current: z.object({
		temperature_2m: z.number(),
		relative_humidity_2m: z.number(),
		weather_code: z.number(),
	}),
});

export type OpenMeteoResponse = z.infer<typeof OpenMeteoResponseSchema>;
