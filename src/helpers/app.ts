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
    //Can add custom logic there :)
    return env("VITE_APP_API_URL");
}