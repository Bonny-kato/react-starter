import { ZodError, ZodSchema } from "zod";
import { isDevMode } from "~/utils/index.ts";
import { removeNullish } from "~/utils/removeNullish.ts";
import { notAcceptable } from "~/utils/request.ts";

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

export const validateApiResponse = <TData = unknown>(
    data: unknown,
    schema: ZodSchema,
): TData => {
    const { errors, data: parsedData } = validateData(
        removeNullish(data),
        schema,
    );

    if (isDevMode) {
        console.log(
            "[///////////////////////////////////////////////////////////////]",
        );

        console.log("[INVALID DATA]", errors);
    }

    if (errors) {
        throw notAcceptable(
            isDevMode
                ? JSON.stringify(errors)
                : "The returned data does not align with the provided schema. Please contact the developers for more information and support.",
        );
    }
    return parsedData as TData;
};
