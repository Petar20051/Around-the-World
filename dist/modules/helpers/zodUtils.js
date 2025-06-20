export function parseWithSchema({ schema, data }) {
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
        console.log(parsed.error.errors);
        throw new Error();
    }
    return parsed.data;
}
