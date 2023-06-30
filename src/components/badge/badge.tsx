import { FC } from "react";
import { twMerge } from "tailwind-merge";

export interface IBadge {
    type?: "warning" | "error" | "success" | "info" | "disabled";
    text: string | number;
    className?: string;
}

const Badge: FC<IBadge> = ({ type = "info", text, className }) => {
    const getColorTheme = () => {
        switch (type) {
            case "disabled": {
                return "inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-normal text-gray-700 ring-1 ring-inset ring-gray-600/20";
            }
            case "warning": {
                return "inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-normal text-yellow-800 ring-1 ring-inset ring-yellow-600/20";
            }
            case "error": {
                return "inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-normal text-red-700 ring-1 ring-inset ring-red-600/10";
            }
            case "success": {
                return "inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-normal text-green-700 ring-1 ring-inset ring-green-600/20";
            }
            default: {
                return "inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-normal text-blue-700 ring-1 ring-inset ring-blue-700/10";
            }
        }
    };
    return (
        <span className={twMerge(`${getColorTheme()}`, className)}>{text}</span>
    );
};
export default Badge;
