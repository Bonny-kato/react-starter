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
