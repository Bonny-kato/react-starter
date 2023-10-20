import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { FC, forwardRef, InputHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    onUpload?: () => void;
    errorMessage?: string;
    showErrorMessage?: boolean;
    hasError?: boolean;
    label?: ReactNode;
    labelClassName?: string;
    wrapperClass?: string;
    optional?: boolean;
}

const Input: FC<InputProps> = forwardRef((props, ref) => {
    const {
        onUpload: handleFileUpload,
        errorMessage,
        labelClassName,
        showErrorMessage = false,
        hasError = false,
        label,
        optional,
        wrapperClass,
        className,
        ...rest
    } = props;

    const isFileInput = rest.type === "file";

    const handleClick = () => {
        if (isFileInput && !!handleFileUpload) {
            handleFileUpload();
        }
    };

    return (
        // @ts-ignore
        <div
            className={twMerge(`${label ? "space-y-1" : ""} `, wrapperClass)}
            onClick={handleClick}
        >
            {label && (
                <label
                    htmlFor={rest.name}
                    className={twMerge(
                        " text-sm items-between font-medium leading-6 text-gray-900",
                        labelClassName
                    )}
                >
                    <span>{label}</span>
                    {optional && (
                        <small className={"text-gray-400 tracking-wide"}>
                            Optional
                        </small>
                    )}
                </label>
            )}

            <div className={`relative`}>
                <input
                    // @ts-ignore
                    ref={ref}
                    {...rest}
                    autoComplete={"off"}
                    autoCorrect={"off"}
                    className={twMerge(
                        `
                        w-full text-gray-900 shadow-sm ring-transparent ring-2 2xl:ring-4 enable-transition  
                        focus:outline-none font-normal tracking-wider py-2 border-[1.4px] xl:text-base md:text-sm  md:py-2.5 lg:py-2 sm:text-sm sm:leading-6
                        ${
                            isFileInput
                                ? "pl-28 cursor-pointer"
                                : "px-2 placeholder-[#646464]"
                        }
                        ${
                            hasError
                                ? "border-red-500 focus:ring-red-500/30 focus:border-red-500"
                                : "border-gray-300 focus:border-black focus:ring-black/40"
                        }
                        rounded-[5px] overflow-hidden
                       placeholder-gray-400 placeholder:font-light placeholder:text-sm
                    `,
                        className
                    )}
                />
                {hasError ? (
                    <ExclamationCircleIcon
                        className={
                            "absolute right-2 pointer-events-none top-0 h-5 w-5 text-red-500 bottom-0 my-auto"
                        }
                    />
                ) : null}
                <button
                    type={"button"}
                    className={`absolute text-gray-900 ${
                        isFileInput ? "" : "hidden"
                    } top-[1px] px-3 bottom-[1px] rounded-l z-10 left-[1px] bg-[#D2D4DA]`}
                >
                    Choose File
                </button>
            </div>
            {hasError && showErrorMessage ? (
                <p className={"text-red-500  text-xs"}>
                    {errorMessage
                        ? errorMessage
                        : `Please provide valid ${className}`}
                </p>
            ) : null}
        </div>
    );
});
export default Input;
