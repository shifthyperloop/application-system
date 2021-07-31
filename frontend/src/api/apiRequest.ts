import config from "../config";
import {loggedInStore} from "../store/authStore";

const fetchOptions: RequestInit = {
    credentials: 'include'
}

export const apiGet = async (path: string): Promise<any> => {
    const response = await fetch(config.apiUrl + 'v0/' + path, fetchOptions);
    return handleJsonResponse(response);
};

export const apiDelete = async (path: string): Promise<void> => {
    const response = await fetch(config.apiUrl + 'v0/' + path, { ...fetchOptions, method: "DELETE" });
    return handleJsonResponse(response);
};

export const apiPost = async (path: string, body: any): Promise<any> => {
    const response = await fetch(config.apiUrl + "v0/" + path, {
        ...fetchOptions,
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    return handleJsonResponse(response);
};

const handleJsonResponse = async (response: Response): Promise<any> => {
    const json = await response.json();

    if ("error" in json) {
        if (!isLoggedIn(response)) {
            loggedInStore.set(null);
        }
        throw new Error(json.error);
    }
    if (!("data" in json)) {
        return null;
    }
    return json.data;
}

const isLoggedIn = (response: Response): boolean => {
    return response.status !== 401;
}