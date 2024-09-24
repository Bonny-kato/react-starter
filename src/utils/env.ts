// ⬇️this code bellow borrowed form Remix website's source code
import { z } from "zod";

const requiredInProduction: z.RefinementEffect<
    string | undefined | boolean
>["refinement"] = (value, ctx) => {
    if (process.env.NODE_ENV === "production" && !value) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message:
                "Missing required environment variable" + ctx.path.join("."),
        });
    }
};

const requiredInDevelopment: z.RefinementEffect<
    string | undefined | boolean
>["refinement"] = (value, ctx) => {
    if (process.env.NODE_ENV === "development" && !value) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message:
                "Missing required environment variable" + ctx.path.join("."),
        });
    }
};

const envSchema = z.object({
    VITE_API_BASE_URL: z
        .string()
        .url()
        .superRefine(requiredInProduction)
        .superRefine(requiredInDevelopment),
    VITE_APP_BASE_URL: z
        .string()
        .url()
        .superRefine(requiredInProduction)
        .superRefine(requiredInDevelopment),
});

/**
 * Parses the environment variables using the provided envSchema.
 *
 * @param {Object} envSchema - The envSchema object used to parse the environment variables.
 * @returns {Object} - The parsed environment variables.
 */
export const env = envSchema.parse(import.meta.env);
