import { FC, LabelHTMLAttributes } from "react";
import { cn } from "~/utils";

interface LabelProps
    extends Omit<LabelHTMLAttributes<HTMLLabelElement>, "children"> {
    label: string;
    optional?: boolean;
}

const Label: FC<LabelProps> = ({ htmlFor, label, className, optional }) => (
    <label
        htmlFor={htmlFor}
        className={cn(
            "items-between text-[13.5px] font-medium leading-6 text-[#4D4D4D]",
            className
        )}
    >
        <span>{label}</span>
        {optional && (
            <small className="font-light tracking-wide text-muted">
                ( Optional )
            </small>
        )}
    </label>
);

export default Label;
