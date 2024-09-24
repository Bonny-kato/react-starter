import { z } from "zod";

/**
 * Creates an ApiResponseSchema object.
 *
 * @template T - The type of schema to use.
 * @param {T} schema - The schema to be used for the data property.
 * @returns {z.ZodObject<{data: z.ZodArray<T>;}>} - The ApiResponseSchema object.
 */

export const ApiListResponseSchema = <T extends z.ZodType>(
    schema: T,
): z.ZodObject<{ data: z.ZodArray<T> }> => {
    return z.object(
        {
            data: z.array(schema),
            // other props
        },
        { message: "Invalid data returned" },
    );
};

export const Timestamp = z.object({
    createdAt: z.string({
        message: "createdAt must be a valid date string",
    }),
    updatedAt: z.string({
        message: "updatedAt must be a valid date string",
    }),
});

/**
 * ApiDetailsResponseSchema is a function that takes a Zod schema as input and returns
 * a new ZodObject schema with a single property `data` that follows the provided
 * input schema.
 *
 * @param {T} schema - A ZodType indicating the schema that the `data` property should adhere to.
 * @returns {z.ZodObject<{ data: T }>} - A ZodObject schema with a `data` property based on the provided schema.
 */
export const ApiDetailsResponseSchema = <T extends z.ZodType>(
    schema: T,
): z.ZodObject<{ data: T }> => {
    return z.object({
        data: schema,
    });
};

//--------------------------------------------------------------

export const SelectInputOptionSchema = z.object({
    label: z.string().min(1, { message: "label type must be a number" }),
    value: z.coerce.number({ message: "value must be a number" }),
});

export type SelectInputOptionType = z.infer<typeof SelectInputOptionSchema>;

//--------------------------------------------------------------

export const NoneEmptyStringSchema = (fieldName: string) => {
    return z
        .string()
        .min(1, { message: `${fieldName} must be none-empty string` });
};
