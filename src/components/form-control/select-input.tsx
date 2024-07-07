import { FC, forwardRef, SelectHTMLAttributes } from "react";
import {
    ErrorIcon,
    ErrorMessage,
    FieldContainer,
} from "~/components/form-control/common";
import Label from "~/components/form-control/label";

import { cn } from "~/utils";

type SelectOption = { value: string | number; label: string };
interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
    hasError?: boolean;
    options: Array<string | SelectOption>;
}

export interface SelectInputProps extends SelectFieldProps {
    errorMessage?: string;
    label?: string;
    optional?: boolean;
    wrapperClassName?: string;
    labelClassName?: string;
}

export const SelectField = forwardRef<HTMLSelectElement, SelectInputProps>(
    ({ className, hasError, options, ...rest }, ref) => {
        const getValue = (option: string | SelectOption) => {
            let value, label;
            if (typeof option === "string") {
                value = option;
                label = option;
                return [value, label];
            }

            return [option["value"], option["label"]];
        };

        return (
            <select
                ref={ref}
                {...rest}
                className={cn(
                    `
                     w-full
                    overflow-hidden rounded-lg border border-swiss-coffee
                    py-2 font-normal tracking-wider  text-gray-900 placeholder-gray-400
                    shadow-sm ring-2  ring-transparent placeholder:text-sm
                    placeholder:font-light placeholder:text-muted focus:outline-none 
                    focus:ring-secondary/40 disabled:bg-gray-100 sm:text-sm sm:leading-6
                    md:py-2.5 md:text-sm lg:py-1.5 xl:text-base 2xl:ring-4
                `,
                    {
                        "border-rose-500 focus:border-rose-500 focus:ring-rose-500/30":
                            hasError,
                    },
                    className,
                )}
            >
                <option disabled={true} value="" selected>
                    --- Choose ---
                </option>
                {options.map((option) => {
                    const [value, label] = getValue(option);
                    return (
                        <option key={label} value={value}>
                            {label}
                        </option>
                    );
                })}
            </select>
        );
    },
);

SelectField.displayName = "SelectField";

const SelectInput: FC<SelectInputProps> = forwardRef<
    HTMLSelectElement,
    SelectInputProps
>(
    (
        {
            label,
            hasError,
            optional,
            errorMessage,
            wrapperClassName,
            labelClassName,
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
                <div className={"relative"}>
                    <SelectField hasError={hasError} {...rest} ref={ref} />
                    {hasError && <ErrorIcon />}
                </div>
                {hasError && <ErrorMessage message={errorMessage} />}
            </FieldContainer>
        );
    },
);

SelectInput.displayName = "SelectInput";

export default SelectInput;
