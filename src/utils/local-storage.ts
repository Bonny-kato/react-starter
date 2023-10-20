import { useState } from "react";

const STORE_KEY = "REACT-STATER";

export function getValueFromLocalStorage(
    key: string | null = null,
    defaultValue: any = null,
) {
    const store = JSON.parse(localStorage.getItem(STORE_KEY) || "{}");
    if (key === null) {
        return store;
    }
    return store.hasOwnProperty(key) ? store[key] : defaultValue;
}

export function saveValueToLocalStorage(
    key: string,
    value: string | boolean | Array<any> | object,
) {
    const store = getValueFromLocalStorage(null, {});
    store[key] = value;
    window.localStorage.setItem(STORE_KEY, JSON.stringify(store));
}

export const saveMultiValueToLocalStorage = (data: object) => {
    Object.entries(data).forEach(([key, value]) => {
        saveValueToLocalStorage(key, value);
    });
};
export const removeValuesFromLocalStorage = (keys: string | Array<string>) => {
    const store = getValueFromLocalStorage();
    const arrOfKeys = Array.isArray(keys) ? keys : [keys];
    arrOfKeys.forEach((_key) => {
        delete store[_key];
    });
    window.localStorage.removeItem(STORE_KEY);
    window.localStorage.setItem(STORE_KEY, JSON.stringify(store));
};

const useLocalStorageState = (key: string, initialValue: any) => {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState(() => {
        try {
            return getValueFromLocalStorage(key, initialValue);
        } catch (error) {
            return initialValue;
        }
    });
    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = (value: any) => {
        try {
            // Allow value to be a function, so we have the same API as useState
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            // Save state
            setStoredValue(valueToStore);

            // Save to local storage
            saveValueToLocalStorage(key, valueToStore);
        } catch (error) {
            // A more advanced implementation would handle the error case
        }
    };

    return [storedValue, setValue];
};

export default useLocalStorageState;

export const localStorageKeys = {
    AUTH_TOKEN: "authToken",
    AUTH_USER: "authUser",
};
