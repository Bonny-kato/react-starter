import { twMerge } from "tailwind-merge";
import { FC, HTMLAttributes } from "react";

export const ParagraphLoading: FC<HTMLAttributes<HTMLDivElement>> = ({
    className,
    ...rest
}) => {
    return (
        <p
            {...rest}
            className={twMerge(
                ` skeleton-loading rounded w-full py-2`,
                className
            )}
        ></p>
    );
};
