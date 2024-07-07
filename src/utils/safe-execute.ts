import { AxiosError } from "axios";
import { redirect } from "react-router-dom";
import { HTTP_UNAUTHORIZED, NETWORK_ERROR_CODE } from "~/constants";
// TODO: Add feature for logging error on development- environment only
type SafeExecuteReturnType<U> = {
    data: U | null;
    error: { message: string; status: number } | null;
};

type ErrorData = {
    cause: string;
    message: string;
    description?: string;
};

async function getHandledErrorResponse(
    error: unknown,
): Promise<{ message: string; status: number }> {
    console.log("[error]", error);
    if (error instanceof AxiosError) {
        if (NETWORK_ERROR_CODE.includes(String(error.code))) {
            throw new Error(
                "Oops we are having trouble to connect with server, Please check your internet connection.",
            );
        }

        const errorData = error.response?.data as ErrorData;

        const statusCode = error.response?.status;
        if (Number(statusCode) === HTTP_UNAUTHORIZED) {
            // TODO: Destroy session and redirect to the login form
            throw redirect("/login"); // redirect to the login form
        }

        return {
            message: errorData?.message,
            status: Number(error.response?.status),
        };
    }
    throw error;
}

/**
 * Executes a given function in a safe manner by handling any errors that occur.
 * @param {Function} func - The function to be executed.
 * @returns {Function} - A function that executes the given function in a safe manner and returns { data, error } object.
 * @template T - The tuple of arguments for the given function.
 * @template U - The return type of the given function.
 */
function safeExecute<T extends Array<unknown>, U>(
    func: (...args: T) => Promise<U>,
): (...args: T) => Promise<SafeExecuteReturnType<U>> {
    return async (...args: T): Promise<SafeExecuteReturnType<U>> => {
        try {
            const data = await func(...args);
            return { data, error: null };
        } catch (error: unknown) {
            const errorInfo = await getHandledErrorResponse(error);
            return { data: null, error: errorInfo };
        }
    };
}

export default safeExecute;
