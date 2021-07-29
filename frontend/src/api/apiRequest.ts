import config from "../config";

export const apiGet = async (path: string): Promise<any> => {
    const response = await fetch(config.apiUrl + 'v0/' + path);
    return response.json();
};

export const apiDelete = async (path: string): Promise<void> => {
    await fetch(config.apiUrl + 'v0/' + path, { method: "DELETE" });
};

export const apiPost = async (path: string, body: any): Promise<any> => {
    const response = await fetch(config.apiUrl + "v0/" + path, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    return response.json();
};