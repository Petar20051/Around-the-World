import z from 'zod';

export const PictureSchema = z.object({
	thumbnail: z.string().url(),
});
export const NameSchema = z.object({
	first: z.string(),
	last: z.string(),
});
export const LocationSchema = z.object({
	city: z.string(),
	country: z.string(),
});

export const RandomUserSchema = z.object({
	picture: PictureSchema,
	name: NameSchema,
	location: LocationSchema,
	nat: z.string(),
});

export const RandomUserResponseSchema = z.object({
	results: z.array(RandomUserSchema),
});

export type RandomUser = z.infer<typeof RandomUserSchema>;
export type RandomUserResponse = z.infer<typeof RandomUserResponseSchema>;
