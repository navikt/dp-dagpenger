export function env(key: string) {
    if (!(key in process.env)) {
        throw new Error(`Kunne ikke finne ${key} i process.env`);
    }
    return process.env[key];
}