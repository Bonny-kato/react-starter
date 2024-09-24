import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import {
    createContext,
    Dispatch,
    FC,
    Fragment,
    ReactNode,
    useContext,
} from "react";
import { Button } from "~/components/FormControl";
import Hide from "~/components/Hide.tsx";
import { EditIcon, TrashIcon } from "~/components/Icons";
import { DialogProps, DialogSize } from "~/components/Modal.tsx";
import { cn } from "~/utils";

const SlideOverContext = createContext<{
    open: boolean;
    onClose: Dispatch<boolean>;
} | null>(null);

const useSliderOverContext = () => {
    const context = useContext(SlideOverContext);
    if (!context)
        throw new Error(
            "useSliderOverContext hooks should be used inside of SlideOverContext provider ",
        );
    return context;
};

const SlideOver = ({ onClose, open, children }: DialogProps) => {
    return (
        <SlideOverContext.Provider value={{ onClose, open }}>
            <Transition appear show={open} as={"div"}>
                <Dialog
                    onClose={onClose}
                    className={" fixed right-0 top-0 z-40 h-full"}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100 "
                        leave="ease-in-out duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gradient-to-t from-gray-900/80 to-gray-900/50 backdrop-blur-[2px] transition-opacity" />
                    </Transition.Child>

                    <Transition.Child
                        className={"relative h-full"}
                        enter="transform transition ease-in-out duration-300 "
                        enterFrom=" translate-x-full"
                        enterTo="translate-x-0"
                        leave="transform transition ease-in-out duration-300 sm:duration-700"
                        leaveFrom="translate-x-0"
                        leaveTo="translate-x-full"
                    >
                        <div className={"h-full p-4"}>{children}</div>
                    </Transition.Child>
                </Dialog>
            </Transition>
        </SlideOverContext.Provider>
    );
};

interface SlideOverPanelProps {
    children: ReactNode;
    className?: string;
    size?: DialogSize;
}

const SliderOverPanel: FC<SlideOverPanelProps> = ({
    size = "sm",
    children,
    className,
}) => {
    return (
        <div
            className={cn(
                "flex h-full flex-col overflow-hidden rounded-xl bg-white",
                { "w-[35rem] ": size === "3xl" },
                { "w-[34rem] ": size === "2xl" },
                { "w-[33rem] ": size === "xl" },
                { "w-[32rem] ": size === "lg" },
                { "w-[31rem] ": size === "md" },
                { "w-[30rem] ": size === "sm" },
                className,
            )}
        >
            {children}
        </div>
    );
};

const SliderOverContent: FC<{ children: ReactNode; className?: string }> = ({
    children,
    className,
}) => {
    return (
        <div
            className={cn(
                "h-full flex-1 overflow-y-auto bg-white p-5",
                className,
            )}
        >
            {children}
        </div>
    );
};

interface SliderOverHeaderProps {
    title: string;
    onEdit?: () => void;
    onDelete?: () => void;
}

export const SliderOverHeader: FC<SliderOverHeaderProps> = ({
    title,
    onDelete,
    onEdit,
}) => {
    const { onClose: setOpen } = useSliderOverContext();
    return (
        <div
            className={
                "items-between mx-4 flex  border-b border-[#D9CECE] py-3"
            }
        >
            <div>
                <h1 className={"text-[14.5px] font-semibold"}>{title}</h1>
            </div>

            <div className={"flex items-center gap-1"}>
                <Hide condition={!onDelete}>
                    <Button
                        tabIndex={-1}
                        onClick={onDelete}
                        className={
                            "center size-7 bg-transparent p-0 text-muted hover:bg-black/10"
                        }
                    >
                        <TrashIcon className={"size-4"} />
                    </Button>
                </Hide>

                <Hide condition={!onEdit}>
                    <Button
                        tabIndex={-1}
                        onClick={onEdit}
                        className={
                            "center size-7 bg-transparent p-0 text-muted hover:bg-black/10"
                        }
                    >
                        <EditIcon className={"size-5"} />
                    </Button>
                </Hide>

                <Button
                    onClick={() => setOpen(false)}
                    className={
                        "center focus: size-7 bg-transparent p-0 text-muted hover:bg-black/10 focus:ring-gray-300 active:ring-black/10"
                    }
                >
                    <XMarkIcon className={"size-5"} />
                </Button>
            </div>
        </div>
    );
};

const SlideOverFooter: FC<{ children: ReactNode; className?: string }> = ({
    children,
    className,
}) => {
    return <footer className={cn("p-5", className)}>{children}</footer>;
};

SlideOver.Panel = SliderOverPanel;
SlideOver.Header = SliderOverHeader;
SlideOver.Content = SliderOverContent;
SlideOver.Footer = SlideOverFooter;

export default SlideOver;
