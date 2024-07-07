import axios from "axios";
import safeExecute from "~/utils/safe-execute.ts";

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
    token?: string,
) => {
    const config: Config = {
        method: type,
        url: endpoint,
        // url: env.API_BASE_URL + endpoint,
        headers: {
            Authorization: `Bearer ${token ?? ""}`,
        },
        data: undefined,
    };

    if (data) {
        console.log("[data instanceof FormData]", data instanceof FormData);
        config.data = data;
        if (data instanceof FormData) {
            config.headers["Content-Type"] = "multipart/form-data";
        }
    }

    console.log("[token]", token);
    console.log(`${type.toLocaleUpperCase()}`, `${config.url}`);
    return axios(config).then((response) => response.data);
};

export const get = safeExecute(async (endpoint: string) => {
    return await request("get", endpoint);
});

export const post = safeExecute(async (endpoint: string, data: object) => {
    return await request("post", endpoint, data);
});

export const remove = safeExecute(async (endpoint: string) => {
    return await request("delete", endpoint, undefined);
});

export const put = safeExecute(async (endpoint: string, data: object) => {
    return await request("put", endpoint, data);
});
