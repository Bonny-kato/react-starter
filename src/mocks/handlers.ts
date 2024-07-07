import { http, HttpResponse } from "msw";
import { HTTP_OK } from "~/constants.ts";
import { authUser } from "~/mocks/data.ts";
import { env } from "~/utils/env.ts";

const API_BASE_URL = env.VITE_API_BASE_URL;

const handlers = [
    http.post(`${API_BASE_URL}/login`, () =>
        HttpResponse.json(authUser, { status: HTTP_OK }),
    ),
];
export default handlers;
