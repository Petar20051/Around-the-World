import z from 'zod';

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
