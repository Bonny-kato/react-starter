import React, {
    FC,
    ReactNode,
    SelectHTMLAttributes,
    useEffect,
    useState,
} from "react";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { twMerge } from "tailwind-merge";

export interface ISelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    hasError?: boolean;
    label?: ReactNode;
    options: Array<any>;
    valueName?: string;
    displayName?: string;
    wrapperClass?: string;
    labelClassName?: string;
    showErrMessage?: boolean;
    optional?: boolean;
}

const Select: FC<ISelectProps> = React.forwardRef((props, ref) => {
    const {
        name = "",
        children,
        className,
        labelClassName,
        defaultValue,
        hasError: errorState = false,
        onChange = null,
        label,
        options,
        valueName,
        displayName,
        optional,
        wrapperClass,
        multiple = false,
        showErrMessage,
        ...rest
    } = props;
    const [hasError, setHasError] = useState(errorState);
    useEffect(() => {
        setHasError(errorState);
    }, [errorState]);

    return (
        <div className={twMerge(`${label ? "space-y-1" : ""}  `, wrapperClass)}>
            {label && (
                <label
                    htmlFor={name}
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
            <div className={"relative"}>
                <select
                    {...rest}
                    multiple={multiple}
                    // @ts-ignore
                    ref={ref}
                    onChange={(e) => {
                        onChange && onChange(e); // check if a handle is specified
                    }}
                    name={name}
                    defaultValue={defaultValue ? defaultValue : ""}
                    className={twMerge(
                        `
                                w-full text-gray-900 shadow-sm focus:border-[1.7px] focus:ring-2 2xl:focus:ring-4 enable-transition  
                                focus:outline-none font-normal tracking-wider py-2 border-[1.4px] xl:text-base md:text-sm  md:py-2.5 lg:py-2 sm:text-sm sm:leading-6
                                   
                                   ${
                                       hasError
                                           ? "border-primary focus:ring-primary/30 focus:border-primary"
                                           : "border-gray-300 focus:border-black focus:ring-black/40"
                                   }
                                   rounded-[5px] overflow-hidden
                                    placeholder-gray-400 placeholder:font-light placeholder:text-sm
                                `,
                        className
                    )}
                >
                    <option disabled={true} value="">
                        Choose
                    </option>
                    {options.map((item) => (
                        <option value={valueName ? item[valueName] : item}>
                            {displayName ? item[displayName] : item}
                        </option>
                    ))}
                </select>

                {hasError ? (
                    <ExclamationCircleIcon
                        className={
                            "absolute right-8 top-0 h-5 w-5 text-red-500 bottom-0 my-auto"
                        }
                    />
                ) : null}
            </div>
            {hasError && showErrMessage ? (
                <p className={"text-red-500 pt-1 text-sm"}>
                    Please provide valid {name}
                </p>
            ) : null}
        </div>
    );
});
export default Select;
