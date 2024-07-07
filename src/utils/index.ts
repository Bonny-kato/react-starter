import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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

export const isDevEnvironment = () => {
    return import.meta.env.MODE === "development";
};

export const cn = (...input: ClassValue[]) => {
    return twMerge(clsx(input));
};
