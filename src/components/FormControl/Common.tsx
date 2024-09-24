import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { FC, HTMLAttributes } from "react";
import { cn } from "~/utils";

export const FieldContainer: FC<HTMLAttributes<HTMLDivElement>> = ({
    children,
    className,
}) => <div className={cn("w-full space-y-1.5", className)}>{children}</div>;

export const ErrorMessage: FC<{ message?: string }> = ({ message }) => (
    <p className="text-xs text-red-500">{message}</p>
);

export const ErrorIcon = () => {
    return (
        <ExclamationCircleIcon
            className={
                "pointer-events-none absolute bottom-0 right-2 top-0 my-auto h-5 w-5 text-red-500"
            }
        />
    );
};

export const inputClassNames = `
    spin-button-none w-full
    overflow-hidden rounded-lg border border-swiss-coffee
    py-2 font-normal tracking-wider text-gray-900
    placeholder-gray-400 shadow-sm ring-2 ring-transparent
    placeholder:text-sm placeholder:font-light placeholder:text-muted 
    focus:outline-none focus:ring-secondary/40 disabled:bg-gray-100 sm:text-sm
    sm:leading-6 md:py-2.5 md:text-sm lg:py-1.5 xl:text-base 2xl:ring-4
                `;
