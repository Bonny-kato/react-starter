import { forwardRef, InputHTMLAttributes } from "react";
import {
    ErrorIcon,
    ErrorMessage,
    FieldContainer,
} from "~/components/FormControl/Common.tsx";
import Label from "~/components/FormControl/Label.tsx";

import { cn } from "~/utils";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    hasError?: boolean;
}

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    errorMessage?: string;
    hasError?: boolean;
    label?: string;
    optional?: boolean;
    supportiveText?: string;
    labelClassName?: string;
    wrapperClassName?: string;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
    ({ className, hasError, ...rest }, ref) => {
        return (
            <input
                ref={ref}
                type="text"
                autoComplete={"off"}
                {...rest}
                className={cn(
                    `
                    spin-button-none w-full
                    overflow-hidden rounded-lg border border-swiss-coffee
                    py-2 font-normal tracking-wider text-gray-900
                    placeholder-gray-400 shadow-sm ring-2 ring-transparent
                    placeholder:text-sm placeholder:font-light placeholder:text-muted 
                    focus:outline-none focus:ring-secondary/40 disabled:bg-gray-100 sm:text-sm
                    sm:leading-6 md:py-2.5 md:text-sm lg:py-1.5 xl:text-base 2xl:ring-4
                `,
                    {
                        "border-rose-500 focus:border-rose-500 focus:ring-rose-500/30":
                            hasError,
                    },
                    className,
                )}
            />
        );
    },
);

InputField.displayName = "InputField";

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
    (
        {
            label,
            hasError,
            optional,
            errorMessage,
            supportiveText,
            labelClassName,
            wrapperClassName,
            ...rest
        },
        ref,
    ) => {
        return (
            <FieldContainer className={wrapperClassName}>
                {label && (
                    <Label
                        htmlFor={rest.id}
                        label={label}
                        optional={optional}
                        className={labelClassName}
                    />
                )}
                <div className={cn("relative", { "pb-1": supportiveText })}>
                    <InputField ref={ref} hasError={hasError} {...rest} />
                    {hasError && <ErrorIcon />}
                </div>
                {supportiveText && (
                    <p className="text-xs/none leading-tight text-gray-800">
                        {supportiveText}
                    </p>
                )}
                {hasError && <ErrorMessage message={errorMessage} />}
            </FieldContainer>
        );
    },
);

TextInput.displayName = "TextInput";

export default TextInput;
