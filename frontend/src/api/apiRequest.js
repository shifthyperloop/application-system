import config from "../config";

export const apiGet = (path) => {
    return fetch(config.apiUrl + 'v0/' + path)
        .then(response => response.json());
};

export const apiPost = (path, body) => {
    return fetch(config.apiUrl + "v0/" + path, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
        .then(response => response.json());
};