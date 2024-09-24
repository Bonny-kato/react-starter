export const HTTP_NOT_FOUND = 404;
export const HTTP_BAD_REQUEST = 400;
export const HTTP_UNAUTHORIZED = 401;
export const HTTP_FORBIDDEN = 403;
export const HTTP_METHOD_NOT_ALLOWED = 405;
export const HTTP_OK = 200;
export const HTTP_INTERNAL_SERVER_ERROR = 500;
export const HTTP_SERVICE_NOT_AVAILABLE = 503;
export const HTTP_NOT_ACCEPTABLE = 406;
export const NETWORK_ERROR_CODE = [
    "ENOTFOUND",
    "ETIMEDOUT",
    "ECONNREFUSED",
    "ENETUNREACH",
];

export enum USER_STATUS {
    ACTIVE = 1,
    INACTIVE = 2,
    CHANGE_PASSWORD = 3,
}
