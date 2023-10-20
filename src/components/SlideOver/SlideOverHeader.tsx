import { Button } from "../FormControl";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { FC } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
    title: string;
    className?: string;
    buttonClassName?: string;
    onClose: () => void;
}

const SlideOverHeader: FC<Props> = (props) => {
    const { onClose: handleClose, title, className, buttonClassName } = props;
    return (
        <header
            className={twMerge(
                "items-between font-medium text-slate-800 sticky top-0 shadow-sm z-20  px-5 py-2 bg-white",
                className,
            )}
        >
            <p> {title}</p>
            <Button
                onClick={handleClose}
                className={twMerge(
                    "h-8 w-8 bg-transparent active:ring-black/70 focus:ring-black/70 focus:bg-gray-200 focus:text-gray-600 hover:text-gray-600 hover:bg-gray-200 text-gray-400 p-0 center",
                    buttonClassName,
                )}
            >
                <XMarkIcon className={"h-6 w-6"} />
            </Button>
        </header>
    );
};
export default SlideOverHeader;
