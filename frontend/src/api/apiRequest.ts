import config from "../config";
import {loggedInStore} from "../store/authStore";
import {navigate} from "svelte-navigator";

const fetchOptions: RequestInit = {
    credentials: 'include'
}

export const apiGet = async (path: string): Promise<any> => {
    const response = await fetch(config.apiUrl + 'v0/' + path, fetchOptions);
    if (!isLoggedIn(response)) {
        return null;
    }
    return response.json();
};

export const apiDelete = async (path: string): Promise<void> => {
    const response = await fetch(config.apiUrl + 'v0/' + path, { ...fetchOptions, method: "DELETE" });
    isLoggedIn(response);
};

export const apiPost = async (path: string, body: any): Promise<any> => {
    const response = await fetch(config.apiUrl + "v0/" + path, {
        ...fetchOptions,
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    if (!isLoggedIn(response)) {
        return null;
    }
    return response.json();
};

const isLoggedIn = (response: Response): boolean => {
    if (response.status === 401) {
        loggedInStore.set(null);
        return false;
    }
    return true;
}