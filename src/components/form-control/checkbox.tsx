import { forwardRef, HTMLAttributes } from "react";
import { cn } from "~/utils";
import { randomId } from "~/utils/random-id";

interface Props extends HTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
}

const Checkbox = forwardRef<HTMLInputElement, Props>(
    ({ label, className, ...rest }, ref) => {
        const id = randomId();
        return (
            <div className={"flex items-center gap-2"}>
                <input
                    ref={ref}
                    type={"checkbox"}
                    className={cn(
                        "shrink-0 cursor-pointer rounded border-gray-400 text-primary focus:ring-primary/50 ",
                        className,
                    )}
                    id={id}
                    {...rest}
                />
                <label className={"cursor-pointer text-sm"} htmlFor={id}>
                    {label}
                </label>
            </div>
        );
    },
);

Checkbox.displayName = "Checkbox";
export default Checkbox;
