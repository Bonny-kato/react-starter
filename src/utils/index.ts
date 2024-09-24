import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges the provided class names using the `clsx` utility function and returns the result.
 *
 * @param {...ClassValue[]} input - The class names to be merged.
 * @returns {string} - The merged class names.
 */
export const cn = (...input: ClassValue[]): string => {
    return twMerge(clsx(input));
};

/**
 * Adds an object to a collection if a condition is met.
 * @param condition - The expression to evaluate.
 * @param objectToAdd - The object to add to the collection.
 * @return array of an object to be added or empty array
 */
export const addObjectIfConditionMet = <T>(
    condition: boolean,
    objectToAdd: T,
): T[] => {
    if (condition) {
        return [objectToAdd];
    }
    return [];
};

/**
 * Generate random id every time it called
 * @return random as id, example sgs86tp1zo
 * */
export const randomId = () => Math.random().toString(36).slice(2);

export const isDevMode = import.meta.env.MODE === "development";
