import { RefObject, useCallback, useEffect, useRef } from "react";

type Handler = () => void;
type MouseEventListener = (event: MouseEvent) => void;
type KeyEventListener = (event: KeyboardEvent) => void;

const useClickAway = (
    handler: Handler,
    escapeKey: boolean = false
): RefObject<HTMLElement> => {
    if (!handler) {
        throw new Error("handler function is required.");
    }

    if (typeof handler !== "function") {
        throw new Error(
            `handler must be a function, but ${typeof handler} is given.`
        );
    }

    const domNodeRef = useRef<HTMLElement | null>(null);

    const handlerRef = useRef<Handler>(handler);
    handlerRef.current = handler;

    const handleClickEvent: MouseEventListener = useCallback(
        (event: MouseEvent) => {
            if (!domNodeRef.current) return;

            if (!domNodeRef.current.contains(event.target as Node)) {
                handlerRef.current();
            }
        },
        []
    );

    const handleEscapeKey: KeyEventListener = useCallback(
        (event: KeyboardEvent) => {
            if (!domNodeRef.current) return;

            if (event.key === "Escape") {
                if (escapeKey) handlerRef.current();
            }
        },
        [escapeKey]
    );

    useEffect(() => {
        document.addEventListener("mousedown", handleClickEvent);
        return () => {
            document.removeEventListener("mousedown", handleClickEvent);
        };
    }, [handleClickEvent]);

    useEffect(() => {
        document.addEventListener("keydown", handleEscapeKey);
        return () => {
            document.removeEventListener("keydown", handleEscapeKey);
        };
    }, [handleEscapeKey]);

    return domNodeRef;
};

export default useClickAway;
