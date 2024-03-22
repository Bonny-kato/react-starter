import { localStorageKeys } from "@/constants.ts";
import { isFormData, lStorage } from "@/utils";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

type TRequestProps = {
    method: string;
    headers?: {
        "Content-Type"?: string;
        Authorization?: string;
    };
    body?: string;
};

export interface IRequestOptions {
    baseUrl?: string;
    header?: {
        "Content-Type"?: "multipart/form-data" | "application/json" | undefined;
    };
}

export const request = async (type: string, endpoint: string, data?: any) => {
    // if (!navigator.onLine) throw new Error("Offline!");

    const API_TOKEN = lStorage.getValue(localStorageKeys.AUTH_TOKEN, "");

    const requestProps: TRequestProps = {
        method: type,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_TOKEN}`,
        },
    };

    if (data) {
        if (isFormData(data)) {
            requestProps.body = data;
            delete requestProps.headers?.["Content-Type"];
        } else requestProps.body = JSON.stringify(data);
    }

    const response = await fetch(BASE_URL + endpoint, requestProps);
    const responseData = await response.json();

    if (!response.ok) throw responseData;
    return responseData;
};

export const get = async (endpoint: string) => {
    return await request("get", endpoint, null);
};

export const patch = async (endpoint: string, data: object) => {
    return await request("patch", endpoint, data);
};

export const put = async (endpoint: string, data: object) => {
    return await request("put", endpoint, data);
};

export const post = async (endpoint: string, data: object) => {
    return await request("post", endpoint, data);
};

export const remove = async (endpoint: string) => {
    return await request("delete", endpoint, null);
};
