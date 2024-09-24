import { FC, HTMLAttributes } from "react";
import { cn } from "~/utils";

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
    imageUrl?: string;
    alt?: string;
    Icon?: FC<{ className?: string }>;
    className?: string;
    imageClassName?: string;
    iconClassName?: string;
}

const Avatar: FC<AvatarProps> = ({
    imageUrl,
    alt,
    className,
    Icon,
    iconClassName,
    imageClassName,
    ...rest
}) => {
    return (
        <div
            {...rest}
            className={cn(
                " center size-9 shrink-0 overflow-hidden rounded-full bg-seashell text-dark",
                className
            )}
        >
            {imageUrl ? (
                <img
                    className={cn("h-full w-full object-cover", imageClassName)}
                    src={imageUrl}
                    alt={alt}
                />
            ) : Icon ? (
                <Icon className={cn("size-5 ", iconClassName)} />
            ) : null}
        </div>
    );
};
export default Avatar;
