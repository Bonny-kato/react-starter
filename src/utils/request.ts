export const invalidDataReturned = (message: string) => {
    throw new Error(message);
};

/**
 * This helper function helps us to return the accurate `HTTP` status,
 * `400` Bad Request, to the client.
 */
export const badRequest = (error: { message: string; status: number }) => {
    throw new Error(`${error.message}: ${error.status}`);
};
