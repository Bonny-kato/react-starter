import { ErrorResponse, json, JsonFunction, redirect } from "react-router-dom";
import {
    HTTP_BAD_REQUEST,
    HTTP_FORBIDDEN,
    HTTP_INTERNAL_SERVER_ERROR,
    HTTP_METHOD_NOT_ALLOWED,
    HTTP_NOT_ACCEPTABLE,
    HTTP_NOT_FOUND,
    HTTP_SERVICE_NOT_AVAILABLE,
} from "~/constants";
import { ErrorType } from "~/utils/safeExcute";

type RedirectUrl = FormDataEntryValue | string | null | undefined;

const validatedRedirectUrl = (redirectUrl: RedirectUrl) => {
    if (
        !redirectUrl ||
        typeof redirectUrl !== "string" ||
        !redirectUrl.startsWith("/") ||
        redirectUrl.startsWith("//")
    ) {
        return "/";
    }
    return redirectUrl;
};

/**
 * Redirects the user to the specified URL if it passes the safety checks. If the URL fails the safety checks, the user is redirected to the homepage by default.
 *
 * @param {RedirectUrl} to - The URL to redirect the user to.
 * @param {number | ResponseInit} [init] - Optional. The parameters for the redirect request.
 * @return {Response} The response from the redirect request.
 */
export function safeRedirect(
    to: RedirectUrl,
    init?: number | ResponseInit,
): Response {
    const redirectTo = validatedRedirectUrl(to);
    return redirect(redirectTo, init);
}

/**
 * This helper function helps us to return the accurate `HTTP` status,
 * `400` Bad Request, to the client.
 */
export const badRequest = <T>(data: T) =>
    json<T>(data, { status: HTTP_BAD_REQUEST });

/**
 * This helper function helps us to return the accurate `HTTP` status,
 * `404` Object not found, to the client.
 */
export const objectNotFound = <T>(data: T) =>
    json<T>(data, { status: HTTP_NOT_FOUND });

/**
 * This helper function helps us to return the accurate `HTTP` status,
 * `406` not acceptable request, to the client.
 */
export const notAcceptable = (message: string) => {
    return throwCustomErrorResponse(message, HTTP_NOT_ACCEPTABLE);
};

/**
 * This helper function helps us to return the accurate `HTTP` status,
 * `406` not acceptable request, to the client.
 */
export const servicesNotAvailable = <T>(data: T) =>
    json<T>(data, { status: HTTP_SERVICE_NOT_AVAILABLE });

/**
 * This helper function helps us to return the accurate `HTTP` status,
 * `403` forbidden request, to the client.
 */
export const unauthorized = <T>(data: T) =>
    json<T>(data, { status: HTTP_FORBIDDEN });

/**
 * Sends a JSON response with the provided data and sets the HTTP status code to 500 (Internal Server Error).
 *
 * @template T The type of the data to be sent in the response.
 * @param {T} data The data to be sent in the response.
 * @returns {Omit<Response, "json"> & { json(): Promise<T> }} - The objectNotFound response object.
 */
export const internalServerError = <T>(
    data: T,
): Omit<Response, "json"> & { json(): Promise<T> } =>
    json<T>(data, { status: HTTP_INTERNAL_SERVER_ERROR });

export const networkError = () =>
    json(
        { message: "Unable to connect" },
        { status: HTTP_SERVICE_NOT_AVAILABLE },
    );

/**
 * Function to handle invalid data returned from the server.
 *
 * - No return value.
 * @param message
 */
export const invalidDataReturned = (message: string) =>
    json({ message }, { status: HTTP_METHOD_NOT_ALLOWED });

const ErrorResponseMap: Record<number, JsonFunction> = {
    [HTTP_BAD_REQUEST]: badRequest,
    [HTTP_INTERNAL_SERVER_ERROR]: internalServerError,
    [HTTP_SERVICE_NOT_AVAILABLE]: servicesNotAvailable,
    [HTTP_NOT_FOUND]: objectNotFound,
    [HTTP_FORBIDDEN]: unauthorized,
};

export const throwError = (error: ErrorType) => {
    const resFunc = ErrorResponseMap[error.status];
    const errorFunc = resFunc ?? servicesNotAvailable;
    throw errorFunc(error);
    // throw new Error(error.message);
};

/**
 * Throws an unauthorized error.
 *
 * @returns {void}
 */
export const throwUnauthorizedError = () => {
    return throwError({
        status: HTTP_FORBIDDEN,
        message: `You are not authorised to view this page. If this is a mistake, contact your admin.`,
    });
};

export const throwCustomErrorResponse = (
    message: string,
    statusCode: number,
) => {
    const error: ErrorResponse = {
        status: statusCode,
        data: { message },
        statusText: message,
    };

    throw new Error(JSON.stringify(error));
};
