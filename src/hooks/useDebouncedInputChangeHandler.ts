import { ChangeEvent, useRef } from "react";

type Callback = (value: string) => void;
const DEBOUNCE_TIMEOUT = 300;

type InputEventHandler = (event: ChangeEvent<HTMLInputElement>) => void;

/**
 * A hook that debounce user input callback
 *
 * @param {Callback} callback - The callback function to be debounced
 * @param debounce
 * @returns {InputEventHandler} - A debounced function that takes an event and calls the callback function after a defined timeout
 */
const useDebouncedInputChangeHandler = (
    callback: Callback,
    debounce?: number
): InputEventHandler => {
    const timeoutRef = useRef<NodeJS.Timeout>();

    return ({ target }: ChangeEvent<HTMLInputElement>) => {
        const keyword = target.value.toLowerCase();

        if (timeoutRef.current) {
            clearInterval(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            callback(keyword);
        }, debounce ?? DEBOUNCE_TIMEOUT);
    };
};

export default useDebouncedInputChangeHandler;
