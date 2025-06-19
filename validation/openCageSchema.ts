//@ts-ignore
import z from 'https://esm.sh/zod';

export const OpenCageResponseSchema = z.object({
	results: z.array(
		z.object({
			geometry: z.object({
				lat: z.number(),
				lng: z.number(),
			}),
		})
	),
});

export type OpenCageResponse = z.infer<typeof OpenCageResponseSchema>;
