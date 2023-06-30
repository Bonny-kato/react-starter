import { FC, HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
    size?: number;
    imageUrl?: string;
    alt?: string;
    icon?: ReactNode;
    className?: string;
}

const Avatar: FC<AvatarProps> = (props) => {
    const { size = 40, imageUrl, alt, className, icon, ...rest } = props;
    return (
        <div
            {...rest}
            className={twMerge(
                " bg-gray-200 center h-10 w-10 shrink-0 overflow-hidden rounded-full",
                className
            )}
        >
            {imageUrl ? (
                <img
                    className={"h-full w-full object-cover"}
                    src={imageUrl}
                    alt={alt}
                />
            ) : icon ? (
                icon
            ) : null}
        </div>
    );
};
export default Avatar;
