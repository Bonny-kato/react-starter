/**
 * Retrieves form data from a request object.
 *
 * @async
 * @template TData - The type of data to parse from the form.
 * @param {Request} request - The request object containing the form data.
 * @returns {Promise<TData>} - A promise that resolves to the parsed form data.
 */
export const parseFormData = async <TData = unknown>(
    request: Request,
): Promise<TData> => {
    const formData = Object.fromEntries(await request.formData());
    return JSON.parse(String(formData.data)) as TData;
};
