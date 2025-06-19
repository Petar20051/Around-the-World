import {ZodSchema} from 'zod';
import {ParseWithSchemaParams} from '../types/params';

export function parseWithSchema<T>({schema, data, errorMsg = 'Invalid API response'}: ParseWithSchemaParams<T>): T {
	const parsed = schema.safeParse(data);
	if (!parsed.success) {
		throw new Error(errorMsg);
	}
	return parsed.data;
}
