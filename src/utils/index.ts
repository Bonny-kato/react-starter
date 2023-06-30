export const isEmptyObject = <T>(obj: T | object) =>
    !Object.keys(obj ?? {}).length;

export const isIncludedIn = (
    value: number | string,
    array: Array<string | number>
) => {
    if (!Array.isArray(array)) {
        throw new Error(`excepted type is array, but ${typeof array} is given`);
    }
    return array.includes(value);
};

export const slugify = (str: string) => {
    return str
        .toString()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "")
        .replace(/--+/g, "-");
};

/**
 * Adds an object to a collection if a condition is met.
 * @param condition - The expression to evaluate.
 * @param objectToAdd - The object to add to the collection.
 * @return array of an object to be added or empty array
 */
export const addObjectIfConditionMet = <T>(
    condition: boolean,
    objectToAdd: T
): T[] => {
    if (condition) {
        return [objectToAdd];
    }
    return [];
};

/**
 * Convert an array of string into lowercase
 * @param array - The array of string to be converted into lowercase
 * @return array of strings converted into lowercase
 */

export const arrToLowerCase = (array: Array<string> = []) => {
    if (!Array.isArray(array)) {
        throw new Error(
            `function arrToLowerCase expect array as type, but ${typeof array} was given.`
        );
    }
    return array.map((item) => {
        return item.toLowerCase();
    });
};

/**
 * Generate random id every time it called
 * @return random as id, example sgs86tp1zo
 * */
export const randomId = () => Math.random().toString(36).slice(2);

/**
 * Groups an array of objects by a specified property.
 *
 * @typeparam T - The type of the grouped objects.
 * @param array - The array of objects to be grouped.
 * @param property - The property by which the objects will be grouped.
 * @returns An object containing the grouped objects, where the keys are the distinct values of the specified property.
 */
export const groupArrOfObjByProperty = (
    array: Array<{ [index: string]: any }> = [],
    property: string
) => {
    return array.reduce((prevObj, nextObj) => {
        const key = nextObj[property];
        prevObj[key] ??= {};
        prevObj[key] = nextObj;
        return prevObj;
    }, {});
};
