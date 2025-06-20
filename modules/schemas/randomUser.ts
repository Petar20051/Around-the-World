import z from 'zod';
import {ZOD_MESSAGES} from '../constants/zodMessages';

const PictureSchema = z.object({
	thumbnail: z.string().url({message: ZOD_MESSAGES.thumbnailUrl}),
});

const NameSchema = z.object({
	first: z.string().min(1, {message: ZOD_MESSAGES.firstNameRequired}),
	last: z.string().min(1, {message: ZOD_MESSAGES.lastNameRequired}),
});

const LocationSchema = z.object({
	city: z.string().min(1, {message: ZOD_MESSAGES.cityRequired}),
	country: z.string().min(1, {message: ZOD_MESSAGES.countryRequired}),
});

const RandomUserSchema = z.object({
	picture: PictureSchema,
	name: NameSchema,
	location: LocationSchema,
	nat: z.string().min(2, {message: ZOD_MESSAGES.nationalityMin}),
});

export const RandomUserResponseSchema = z.object({
	results: z.array(RandomUserSchema).min(1, {message: ZOD_MESSAGES.atLeastOneUser}),
});

export type RandomUser = z.infer<typeof RandomUserSchema>;
export type RandomUserResponse = z.infer<typeof RandomUserResponseSchema>;
