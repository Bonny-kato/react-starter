import { FC, forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { Link, LinkProps } from "react-router-dom";

interface ButtonProps extends LinkProps {
    outline?: boolean;
    to: string;
    scroll?: boolean;
}

const ButtonLink: FC<ButtonProps> = forwardRef((props, ref) => {
    const { className, children, outline, scroll = true, ...rest } = props;
    // 2xl:text-xl 2xl:py-5 2xl:px-6 2xl:tracking-wide 2xl:space-x-8
    return (
        <Link
            //@ts-ignore
            ref={ref}
            {...rest}
            className={twMerge(
                ` ${
                    outline
                        ? " border-[2px] border-primary  text-primary"
                        : "bg-primary text-red-50"
                }  px-4  py-1.5  text-sm  w-fit hover:opacity-90 inline-block text-center rounded-md`,
                className
            )}
        >
            {children}
        </Link>
    );
});

export default ButtonLink;
