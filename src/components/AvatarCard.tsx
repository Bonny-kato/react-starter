import { FC, Fragment } from "react";
import Avatar, { AvatarProps } from "~/components/Avatar";
import SkeletonLoader from "~/components/SkeletonLoader";
import { cn } from "~/utils";

export interface AvatarCardProps extends AvatarProps {
    title: string;
    center?: boolean;
    titleClassName?: string;
    subtitle?: string;
    subtitleClassName?: string;
    wrapperClassName?: string;
}

const AvatarCard: FC<AvatarCardProps> = ({
    wrapperClassName,
    title,
    center,
    titleClassName,
    subtitleClassName,
    subtitle,
    className,
    ...rest
}) => {
    const s = subtitle?.split("\n");

    return (
        <div
            className={cn(
                "flex items-center gap-2.5",
                { "flex-col text-center": !!center },
                wrapperClassName,
            )}
        >
            {(rest.Icon || rest.imageUrl) && (
                <Avatar {...rest} className={cn("size-10", className)} />
            )}

            <div className={"flex flex-col"}>
                <p className={cn("text-sm font-semibold", titleClassName)}>
                    {title}
                </p>
                <p
                    className={cn(
                        "text-[13.5px] text-muted",
                        subtitleClassName,
                    )}
                >
                    {s?.map((p, index) => (
                        <Fragment key={index}>
                            <span>{p}</span>
                            {s.length > 1 && index < s.length - 1 && (
                                <span className={"mx-1 font-medium opacity-60"}>
                                    |
                                </span>
                            )}
                        </Fragment>
                    ))}
                </p>
            </div>
        </div>
    );
};
export default AvatarCard;

interface AvatarCardLoadingProps
    extends Omit<AvatarCardProps, "title" | "subtitle" | "Icon" | "imageUrl"> {
    wrapperClassName?: string;
}

export const AvatarCardLoading: FC<AvatarCardLoadingProps> = ({
    titleClassName,
    subtitleClassName,
    className,
    wrapperClassName,
    center,
}) => {
    return (
        <div
            className={cn(
                "flex items-center gap-2.5",
                { "flex-col gap-y-4 text-center": center },
                wrapperClassName,
            )}
        >
            <SkeletonLoader
                className={cn("size-10 rounded-full p-0 ", className)}
            />
            <div className={cn("space-y-2", { "center flex-col": center })}>
                <SkeletonLoader className={cn("w-32 py-2", titleClassName)} />
                <SkeletonLoader
                    className={cn("w-36 py-1.5", subtitleClassName, {
                        "w-20": center,
                    })}
                />
            </div>
        </div>
    );
};
