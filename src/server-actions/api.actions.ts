"use server";
import axios from 'axios';

function baseUrl(path = '') {
    return process.env.NEXT_PUBLIC_SERVER_URL + path;
}

export async function startSession(data: object) {
    const url = baseUrl("/form/session/start");
    try {
        const response = await axios.post(url, data);
        return response.data; // Adjust according to the API response structure
    } catch (error) {
        const errMessage = (error as Error).message;
        return { e: errMessage, url: url };
    }
}

export async function updateSession(data: object) {
    const url = baseUrl("/form/session/update");
    try {
        const response = await axios.post(url, data);
        return response.data; // Adjust according to the API response structure
    } catch (error) {
        const errMessage = (error as Error).message;
        return { e: errMessage, url: url };
    }
}

export async function productList() {
    const url = baseUrl("/form/products");
    try {
        const response = await axios.get(url);
        return response.data; // Adjust according to the API response structure
    } catch (error) {
        const errMessage = (error as Error).message;
        return {
            success: false,
            message: errMessage,
            data: null,
            url: url
        };
    }
}

export async function getSession(id: string) {
    const url = baseUrl("/form/session/info/" + id);
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        const errMessage = (error as Error).message;
        return {
            success: false,
            message: errMessage,
            data: null,
            url: url
        };
    }
}

export async function recreateSession(id: string, token: string, data: object) {
    const url = baseUrl("/form/session/recreate/" + id);
    try {
        const response = await axios.post(url, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        const errMessage = (error as Error).message;
        return {
            success: false,
            message: errMessage,
            data: null,
            url: url
        };
    }
}