import { FC } from "react";
import { twMerge } from "tailwind-merge";

const SpinLoader: FC<{ className?: string }> = ({ className }) => {
    return (
        <div
            className={twMerge(
                `
            border-black/60 h-6 w-6
            border-[2px] rounded-full 
            border-t-transparent animate-spin`,
                className
            )}
        ></div>
    );
};
export default SpinLoader;
