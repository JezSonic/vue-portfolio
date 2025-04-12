export const env = (key: string, default_val: any | null = null) => {
    const val = import.meta.env[key];
    if (val == 'true') {
        return true;
    } else if (val == 'false') {
        return false;
    }
    return val || default_val;
};

export const getApiUrl = () => {
    if (env("VITE_APP_APP_ENV") == 'local') {
        return "http://localhost:81/api/"
    }
}