import { forwardRef, TextareaHTMLAttributes } from "react";
import {
    ErrorIcon,
    ErrorMessage,
    FieldContainer,
} from "~/components/form-control/common";
import Label from "~/components/form-control/label";

import { cn } from "~/utils";

interface TextareaFieldProps
    extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    hasError?: boolean;
}

export interface TextareaProps
    extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    errorMessage?: string;
    hasError?: boolean;
    label?: string;
    optional?: boolean;
    supportiveText?: string;
    labelClassName?: string;
    wrapperClassName?: string;
}

export const TextareaField = forwardRef<
    HTMLTextAreaElement,
    TextareaFieldProps
>(({ className, hasError, rows = 4, ...rest }, ref) => {
    return (
        <textarea
            ref={ref}
            rows={rows}
            autoComplete={"off"}
            {...rest}
            className={cn(
                `
                    spin-button-none  spin-button-none w-full
                     resize-none overflow-hidden rounded-lg border
                    border-swiss-coffee py-2 font-normal tracking-wider text-gray-900
                    placeholder-gray-400 shadow-sm ring-2 ring-transparent
                    placeholder:text-sm placeholder:font-light placeholder:text-muted 
                    focus:outline-none focus:ring-secondary/40 sm:text-sm sm:leading-6
                    md:py-2.5 md:text-sm lg:py-1.5 xl:text-base 2xl:ring-4
                `,
                {
                    "border-rose-500 focus:border-rose-500 focus:ring-rose-500/30":
                        hasError,
                },
                className,
            )}
        ></textarea>
    );
});

TextareaField.displayName = "InputField";

const TextareaInput = forwardRef<HTMLTextAreaElement, TextareaProps>(
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
                    <TextareaField ref={ref} hasError={hasError} {...rest} />
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

TextareaInput.displayName = "Textarea";

export default TextareaInput;
