import { ReactNode } from "react";
import { Control, UseFormRegister } from "react-hook-form";
import Checkbox from "~/components/form-control/checkbox";
import SelectInput, {
    SelectInputProps,
} from "~/components/form-control/select-input";
import TextInput, {
    TextInputProps,
} from "~/components/form-control/text-input";
import Textarea from "~/components/form-control/textarea";
import { cn } from "~/utils";

type FormFieldTypes =
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
    | "checkbox";

export interface FormField
    extends TextInputProps,
        Partial<Pick<SelectInputProps, "options" | "wrapperClassName">> {
    defaultChecked?: boolean;
    onSearch?: (value: string) => void;
    isPassword?: boolean;
    minValue?: number;
    rangeUnit?: string;
    step?: number;
    maxValue?: number;
    emptyDataMessage?: string;
    type?: FormFieldTypes;
    control?: Control;
    // @ts-expect-error TS2314: Generic type UseFormRegister requires 1 type argument(s).
    register?: UseFormRegister;
    wrapperClassName?: string;
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
    textarea: Textarea,
    select: SelectInput,
};

/**
 * Renders a form field based on the given FormField object.
 *
 * @param {FormField} field - The FormField object to render.
 * @returns {ReactNode} - The rendered form field component.
 */
const renderFormField = (field: FormField): ReactNode => {
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
        ...formProps
    } = field;

    const fieldClassName = {
        className: cn(defaultClassName, className),
        labelClassName: cn(defaultLabelClassName, labelClassName),
    };

    const FormField = formFields[type];

    return (
        <FormField
            {...(!control && register ? register(String(name)) : {})}
            {...(control && { control, name })}
            {...formProps}
            {...fieldClassName}
            type={type}
        />
    );
};

export default renderFormField;
