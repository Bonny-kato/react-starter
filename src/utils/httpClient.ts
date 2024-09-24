import axios from "axios";
import { env } from "~/utils/env";
import { isDevMode } from "~/utils/index.ts";
import { lStorage, lStorageKeys } from "~/utils/localStorage.ts";
import safeExecute from "~/utils/safeExcute";

type HttpMethod = "get" | "post" | "put" | "patch" | "delete";

interface Config {
    method: HttpMethod;
    url: string;
    headers: {
        Authorization: string;
        "Content-Type"?: "application/json" | "multipart/form-data";
    };
    data: undefined | object | FormData;
}

export const request = async (
    type: HttpMethod,
    endpoint: string,
    data?: object,
) => {
    const token = lStorage.getValue(lStorageKeys.AUTH_TOKEN);

    const config: Config = {
        method: type,
        url: env.VITE_API_BASE_URL + endpoint,
        headers: {
            Authorization: `Bearer ${token ?? ""}`,
        },
        data: undefined,
    };

    if (data) {
        config.data = data;
        console.log("[Sent-Data]", data);
        if (data instanceof FormData) {
            config.headers["Content-Type"] = "multipart/form-data";
        }
    }

    if (isDevMode) {
        console.log("[token]", token);
        console.log(`${type.toLocaleUpperCase()}`, `${config.url}`);
    }

    return axios(config).then((response) => response.data);
};

/**
 * Sends a GET request to the specified endpoint.
 *
 * @param {string} endpoint - The API endpoint to send the GET request to.
 * @returns {Promise<any>} - The response data from the get-go request.
 */
export const get = safeExecute(async (endpoint: string) => {
    return await request("get", endpoint);
});

/**
 * Sends a POST request to the specified endpoint with the provided data.
 *
 * @param {string} endpoint - The API endpoint to send the POST request to.
 * @param {object} data - The data to be sent in the POST request.
 * @returns {Promise<any>} - The response data from the POST request.
 */
export const post = safeExecute(async (endpoint: string, data: object) => {
    return await request("post", endpoint, data);
});

/**
 * Sends a DELETE request to the specified endpoint.
 *
 * @param {string} endpoint - The API endpoint to send the DELETE request to.
 * @returns {Promise<any>} - The response data from the DELETE request.
 */
export const remove = safeExecute(async (endpoint: string) => {
    return await request("delete", endpoint);
});

/**
 * Sends a PUT request to the specified endpoint with the provided data.
 *
 * @param {string} endpoint - The API endpoint to send the PUT request to.
 * @param {object} data - The data to be sent in the PUT request.
 * @returns {Promise<any>} - The response data from the PUT request.
 */
export const put = safeExecute(async (endpoint: string, data: object) => {
    return await request("put", endpoint, data);
});

/**
 * Sends a PATCH request to the specified endpoint with the provided data.
 *
 * @param {string} endpoint - The API endpoint to send the PATCH request to.
 * @param {object} data - The data to be sent in the PATCH request.
 * @returns {Promise<any>} - The response data from the PATCH request.
 */
export const patch = safeExecute(async (endpoint: string, data: object) => {
    return await request("patch", endpoint, data);
});
