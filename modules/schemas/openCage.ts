//@ts-ignore
import z from 'https://esm.sh/zod';

export const GeometrySchema = z.object({
	lat: z.number(),
	lng: z.number(),
});

export const OpenCageResultSchema = z.object({
	geometry: GeometrySchema,
});

export const OpenCageResponseSchema = z.object({
	results: z.array(OpenCageResultSchema),
});

export type OpenCageResponse = z.infer<typeof OpenCageResponseSchema>;
