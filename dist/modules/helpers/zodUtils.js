export function parseWithSchema({ schema, data, errorMsg = 'Invalid API response' }) {
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
        throw new Error(errorMsg);
    }
    return parsed.data;
}
