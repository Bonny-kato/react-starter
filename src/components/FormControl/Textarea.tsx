import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import React, {
    FC,
    forwardRef,
    ReactNode,
    TextareaHTMLAttributes,
} from "react";
import { twMerge } from "tailwind-merge";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    wrapperClass?: string;
    labelClassName?: string;
    hasError?: boolean;
    showErrorMessage?: boolean;
    showResizer?: boolean;
    label: ReactNode;
}

const Textarea: FC<TextareaProps> = forwardRef((props, ref) => {
    const {
        className,
        labelClassName,
        showResizer = "none",
        hasError = false,
        showErrorMessage = false,
        label,
        wrapperClass,
        ...rest
    } = props;

    return (
        <div className={`${wrapperClass}  space-y-1`}>
            {label && (
                <label
                    htmlFor={rest.name}
                    className={twMerge(
                        "block text-sm font-medium leading-6 text-gray-900",
                        labelClassName
                    )}
                >
                    {" "}
                    {label}{" "}
                </label>
            )}

            <div className={"relative "}>
                <textarea
                    // @ts-ignore
                    ref={ref}
                    {...rest}
                    className={twMerge(
                        `
                        w-full text-black h-32 resize-none ring-transparent ring-2 2xl:ring-4 enable-transition  
                        focus:outline-none  tracking-wider  py-2 border-[1.4px]  2xl:text-base  md:py-2.5 lg:py-2 
                       
                        ${
                            hasError
                                ? "border-red-500 focus:ring-red-500/30 focus:border-red-500"
                                : "border-[#D2D4DA] focus:border-black focus:ring-black/40"
                        }
                        rounded-[5px] overflow-hidden
                       placeholder-black/60 placeholder:font-light placeholder:text-sm
                    `,
                        className
                    )}
                ></textarea>
                {hasError ? (
                    <ExclamationCircleIcon
                        className={
                            "absolute right-2 top-0 h-5 w-5 text-red-500 bottom-0 my-auto"
                        }
                    />
                ) : null}
            </div>
            {hasError && showErrorMessage ? (
                <p className={"text-red-500  text-xs"}>
                    Please provide valid {rest.name}
                </p>
            ) : null}
        </div>
    );
});
export default Textarea;
