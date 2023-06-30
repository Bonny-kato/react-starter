import {
    getValueFromLocalStorage,
    localStorageKeys,
} from "@/utils/local-storage";
import { isFormData } from "@/utils";

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

export const request = async (
    type: string,
    endpoint: string,
    data?: any,
    options?: IRequestOptions
) => {
    // if (!navigator.onLine) throw new Error("Offline!");

    const API_TOKEN = getValueFromLocalStorage(localStorageKeys.AUTH_TOKEN, "");

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

export const get = async (endpoint: string, options?: IRequestOptions) => {
    return await request("get", endpoint, null, options);
};

export const patch = async (
    endpoint: string,
    data: object,
    options?: IRequestOptions
) => {
    return await request("patch", endpoint, data, options);
};

export const put = async (
    endpoint: string,
    data: object,
    options?: IRequestOptions
) => {
    return await request("put", endpoint, data, options);
};

export const post = async (
    endpoint: string,
    data: object,
    options?: IRequestOptions
) => {
    return await request("post", endpoint, data, options);
};

export const remove = async (endpoint: string, options?: IRequestOptions) => {
    return await request("delete", endpoint, null, options);
};
