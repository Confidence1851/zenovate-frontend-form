"use server";
import axios from 'axios';

function baseUrl(path = '') {
    return process.env.NEXT_PUBLIC_SERVER_URL + path;
}

export async function startSession(data) {
    try {
        const response = await axios.post(baseUrl("/form/session/start") , data);
        return response.data; // Adjust according to the API response structure
    } catch (error) {
        return { e: error.toString(), url: baseUrl("/form/session/start") };
    }
}

export async function updateSession(data) {
    try {
        const response = await axios.post(baseUrl("/form/session/update") , data);
        return response.data; // Adjust according to the API response structure
    } catch (error) {
        return { e: error.toString(), url: baseUrl("/form/session/start") };
    }
}