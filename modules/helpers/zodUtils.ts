import {ParseWithSchemaParams} from '../types/params';

export function parseWithSchema<T>({schema, data}: ParseWithSchemaParams<T>): T {
	const parsed = schema.safeParse(data);
	if (!parsed.success) {
		console.log(parsed.error.errors);
		throw new Error();
	}
	return parsed.data;
}
