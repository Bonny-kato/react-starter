import { ReactNode } from "react";
import { Control, FieldValues, Path, UseFormRegister } from "react-hook-form";
import { ComboboxFormInput, TextInputProps } from "~/components/FormControl";
import Checkbox from "~/components/FormControl/Checkbox.tsx";
import SelectInput, {
    SelectInputProps,
} from "~/components/FormControl/SelectInput.tsx";
import TextareaInput from "~/components/FormControl/Textarea.tsx";
import TextInput from "~/components/FormControl/TextInput.tsx";

import { cn } from "~/utils";

type TFormFieldTypes =
    | "date"
    | "select"
    | "text"
    | "time"
    | "number"
    | "email"
    | "password"
    | "tel"
    | "color"
    | "textarea"
    | "checkbox"
    | "combobox";

type DefaultValue = string | number | string[] | undefined;

export interface FormField<TFieldValues extends FieldValues = FieldValues>
    extends Omit<TextInputProps, "defaultValue">,
        Partial<Pick<SelectInputProps, "options" | "wrapperClassName">> {
    defaultChecked?: boolean;
    onSearch?: (value: string) => void;
    isPassword?: boolean;
    minValue?: number;
    rangeUnit?: string;
    step?: number;
    rows?: number;
    maxValue?: number;
    defaultValue?: DefaultValue;
    emptyDataMessage?: string;
    type?: TFormFieldTypes;
    loading?: boolean;
    control?: Control<TFieldValues>;

    register?: UseFormRegister<TFieldValues>;
    name: Path<TFieldValues>;
    wrapperClassName?: string;
    onInputChange?: (value: string) => void;
}

const formFields = {
    date: TextInput,
    text: TextInput,
    time: TextInput,
    number: TextInput,
    email: TextInput,
    password: TextInput,
    checkbox: Checkbox,
    tel: TextInput,
    color: TextInput,
    textarea: TextareaInput,
    select: SelectInput,
    combobox: ComboboxFormInput,
};

/**
 * Renders a form field based on the given FormField object.
 *
 * @param {FormField} field - The FormField object to render.
 * @returns {ReactNode} - The rendered form field component.
 */
function renderFormField<TFieldValues extends FieldValues = FieldValues>(
    field: FormField<TFieldValues>,
): ReactNode {
    const defaultLabelClassName = "text-gray-700 font-normal text-[13.5px]";
    const defaultClassName =
        "lg:py-2.5 border-[1px] shadow-none  text-gray-700 xl:text-sm";

    const {
        register,
        className,
        labelClassName,
        name,
        control,
        type = "text",
        ...otherProps
    } = field;

    const fieldClassName = {
        className: cn(defaultClassName, className, {
            "lg:py-0 text-primary": type === "checkbox",
        }),
        labelClassName: cn(defaultLabelClassName, labelClassName),
    };

    const FormField = formFields[type];

    return (
        // @ts-expect-error Type Control<TFieldValues> | undefined is not assignable to type Control<FieldValues>
        <FormField
            {...(!control && register ? register(name) : {})}
            {...(control && { control, name })}
            {...otherProps}
            {...fieldClassName}
            type={type}
        />
    );
}

export default renderFormField;
