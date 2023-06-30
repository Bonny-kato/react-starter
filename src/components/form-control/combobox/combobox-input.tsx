import { Control, Controller } from "react-hook-form";
import Combobox, { ComboboxProps } from "@/components/combobox";
import { FC } from "react";

export interface ComboboxInputProps
    extends Omit<ComboboxProps, "name" | "onChange" | "onBlur"> {
    control: Control;
    name: string;
}

const ComboboxInput: FC<ComboboxInputProps> = (props) => {
    const { control, name, ...rest } = props;
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, onBlur } }) => (
                <Combobox {...rest} onChange={onChange} onBlur={onBlur} />
            )}
        />
    );
};
export default ComboboxInput;
