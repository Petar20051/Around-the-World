import { DEFAULT_INVALID_DATA_MSG } from '../constants';
export function parseWithSchema({ schema, data }) {
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
        console.log(parsed.error.errors);
        throw new Error(DEFAULT_INVALID_DATA_MSG);
    }
    return parsed.data;
}
