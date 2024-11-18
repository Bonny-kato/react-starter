import { ZodError, ZodSchema } from "zod";
import { invalidDataReturned } from "~/utils/request.ts";

type FormDataError<T> = Partial<Record<keyof T, string>>;
type ValidateData<T> = {
    data: T;
    errors: Partial<Record<keyof T, string>> | null;
};

/**
 * Validates the given data against the provided schema.
 * @template TData - The type of data.
 * @param {TData} data - The data to be validated.
 * @param {ZodSchema} schema - The schema to validate against.
 * @returns {ValidateData} - An object containing the validated data and any validation errors.
 */
const validateData = <TData = unknown>(
    data: TData,
    schema: ZodSchema,
): ValidateData<TData> => {
    try {
        const validData = schema.parse(data) as TData;
        return { data: validData, errors: null };
    } catch (e) {
        const errors = e as ZodError;
        return {
            data,
            errors: errors.issues.reduce((acc: FormDataError<TData>, curr) => {
                const key = curr.path[0] as keyof TData;
                acc[key] = curr.message;
                return acc;
            }, {}),
        };
    }
};
export default validateData;

export const validateApiResponse = <TData = unknown>(
    data: TData,
    schema: ZodSchema,
    message?: string,
): TData => {
    const { errors, data: parsedData } = validateData(data, schema);
    // TODO: Remove this console log
    console.log(
        "[///////////////////////////////////////////////////////////////]",
    );
    console.log("[INVALID DATA]", errors);
    if (errors) {
        throw invalidDataReturned(message ?? "Invalid data returned");
    }
    return parsedData;
};
