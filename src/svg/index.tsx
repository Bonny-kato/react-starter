import { FC } from "react";

interface ISvgProps {
    className?: string;
    color?: string;
    strokeWidth?: number;
}

export const LoadingCircle: FC<ISvgProps> = ({
    className,
    strokeWidth = "4",
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            viewBox="0 0 24 24"
            className={`animate-spin ${className}`}
        >
            <path
                d="M12 2V6M12 18V22M6 12H2M22 12H18M19.0784 19.0784L16.25 16.25M19.0784 4.99994L16.25 7.82837M4.92157 19.0784L7.75 16.25M4.92157 4.99994L7.75 7.82837"
                strokeLinecap="round"
                strokeLinejoin="round"
            ></path>
        </svg>
    );
};
