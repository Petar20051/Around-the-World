import z from 'zod';
import { ZOD_MESSAGES } from '../constants/zodMessages';
const GeometrySchema = z.object({
    lat: z.number().min(-90, { message: ZOD_MESSAGES.latitudeMin }).max(90, { message: ZOD_MESSAGES.latitudeMax }),
    lng: z.number().min(-180, { message: ZOD_MESSAGES.longitudeMin }).max(180, { message: ZOD_MESSAGES.longitudeMax }),
});
const OpenCageResultSchema = z.object({
    geometry: GeometrySchema,
});
export const OpenCageResponseSchema = z.object({
    results: z.array(OpenCageResultSchema),
});
