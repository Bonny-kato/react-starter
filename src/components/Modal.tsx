import { Dialog, Transition } from "@headlessui/react";
import {
    ExclamationTriangleIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import {
    createContext,
    createElement,
    Dispatch,
    ElementType,
    FC,
    Fragment,
    ReactNode,
    useContext,
} from "react";
import AvatarCard from "~/components/AvatarCard.tsx";
import { Button } from "~/components/FormControl";
import SkeletonLoader from "~/components/SkeletonLoader.tsx";
import { cn } from "~/utils";

export type DialogSize = "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

export interface DialogProps {
    open: boolean;
    children: ReactNode;
    onClose: Dispatch<boolean>;
    top?: DialogSize;
}

const ModalContext = createContext<{
    open: boolean;
    onClose: Dispatch<boolean>;
} | null>(null);

const useModalContext = () => {
    const context = useContext(ModalContext);
    if (!context)
        throw new Error(
            "useModalContext hooks should be used inside of SlideOverContext provider ",
        );
    return context;
};

const Modal = ({ open, onClose, children, top = "3xl" }: DialogProps) => {
    return (
        <ModalContext.Provider value={{ open, onClose }}>
            <Transition appear show={open}>
                <Dialog
                    as={"div"}
                    onClose={onClose}
                    className={cn(
                        "fixed inset-0 top-0 z-50 p-5 ",
                        { "p-[10vh] 2xl:pt-[10vh] ": top === "3xl" },
                        { "p-[8vh] 2xl:pt-[10vh] ": top === "2xl" },
                        { "p-[6vh] 2xl:pt-[10vh] ": top === "xl" },
                        { "p-[5vh] 2xl:pt-[10vh] ": top === "lg" },
                        { "p-[4vh] 2xl:pt-[10vh] ": top === "md" },
                        { "p-[3vh] 2xl:pt-[10vh] ": top === "sm" },
                    )}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-200 "
                        enterFrom="opacity-0"
                        enterTo="opacity-100 "
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gradient-to-t from-gray-900/80 to-gray-900/50 backdrop-blur-[2px] transition-opacity" />
                    </Transition.Child>

                    <Transition.Child
                        className="relative mx-auto w-fit"
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-50"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        {children}
                    </Transition.Child>
                </Dialog>
            </Transition>
        </ModalContext.Provider>
    );
};

interface ModalPanelProps extends Omit<Partial<HTMLFormElement>, "children"> {
    children: ReactNode;
    size?: DialogSize;
    as?: ElementType;
}

export const ModalPanel: FC<ModalPanelProps> = ({
    children,
    className,
    size = "3xl",
    as = "div",
    ...otherProps
}) => {
    return createElement(
        as,
        {
            className: cn(
                "flex h-full flex-col overflow-hidden rounded-xl bg-white pb-6",
                { "w-[35rem] ": size === "3xl" },
                { "w-[34rem] ": size === "2xl" },
                { "w-[33rem] ": size === "xl" },
                { "w-[32rem] ": size === "lg" },
                { "w-[31rem] ": size === "md" },
                { "w-[30rem] ": size === "sm" },
                className,
            ),
            ...otherProps,
        },
        children,
    );
};

interface ModalHeaderProps {
    title: string;
    subtitle?: string;
    Icon: FC<{ className?: string }>;
}

export const ModalHeader: FC<ModalHeaderProps> = ({
    title,
    subtitle,
    Icon,
}) => {
    const { onClose: setOpen } = useModalContext();
    return (
        <header className={"items-between items-start gap-2 px-6 py-5"}>
            <AvatarCard
                wrapperClassName={"gap-4 items-start "}
                className={
                    "mt-0.5 border border-[#D9CECE] bg-transparent text-dark"
                }
                Icon={Icon}
                titleClassName={"text-[14.5px]"}
                title={title}
                subtitle={subtitle}
                subtitleClassName={"text-muted font-light"}
            />

            <Button
                type="button"
                onClick={() => setOpen(false)}
                className={
                    "center size-7 shrink-0 bg-transparent p-0 text-muted hover:bg-black/10 focus:ring-gray-300 active:ring-black/10"
                }
            >
                <XMarkIcon className={"size-6"} />
            </Button>
        </header>
    );
};

export const ModalContent: FC<{ children: ReactNode; className?: string }> = ({
    children,
    className,
}) => {
    return (
        <div className={cn(" flex-1 bg-white px-6", className)}>{children}</div>
    );
};

interface ModalFooterProps {
    saveBtnLabel?: string;
    className?: string;
    loading?: boolean;
    onCancel?: () => void;
    cancelBtnLabel?: string;
    disabled?: boolean;
    onSave?: () => void;
}

export const ModalFooter: FC<ModalFooterProps> = ({
    saveBtnLabel,
    className,
    loading,
    onCancel,
    cancelBtnLabel,
    disabled,
    onSave: handleSave,
}) => {
    const { onClose: setOpen } = useModalContext();

    const handleOnClick = () => {
        if (onCancel) onCancel();
        else setOpen(false);
    };
    return (
        <footer className={cn("flex items-center gap-5 px-6 pt-6", className)}>
            <Button
                type={"button"}
                onClick={handleOnClick}
                className={
                    "w-full border border-swiss-coffee bg-transparent font-medium text-muted focus:ring-gray-500/60 active:ring-gray-500/60"
                }
            >
                {cancelBtnLabel ?? "Cancel"}
            </Button>

            <Button
                disabled={disabled}
                onClick={handleSave}
                loading={loading}
                className={
                    "w-full border border-primary font-medium disabled:cursor-not-allowed disabled:opacity-50"
                }
            >
                {saveBtnLabel ?? "Save"}
            </Button>
        </footer>
    );
};

export const ModalFooterLoading: FC<{ className?: string }> = ({
    className,
}) => {
    return (
        <footer className={cn("flex items-center gap-5 px-6 pt-6", className)}>
            <SkeletonLoader className={"h-9 rounded-lg py-0"} />
            <SkeletonLoader className={"h-9 rounded-lg py-0"} />
        </footer>
    );
};

export const ModalFooterSkeletonLoading = () => {
    return (
        <div className={"flex items-center gap-5  pt-6 "}>
            <SkeletonLoader className={"w-full rounded-lg py-5"} />
            <SkeletonLoader className={"w-full rounded-lg py-5"} />
        </div>
    );
};

const FormError: FC<{ className?: string; errorMessage?: string }> = ({
    className,
    errorMessage,
}) => {
    return (
        <div
            hidden={!errorMessage}
            className={cn(
                "flex justify-center gap-2 rounded-md bg-red-50 p-2 pl-3 text-red-900",
                className,
            )}
        >
            <ExclamationTriangleIcon
                strokeWidth={2}
                className={"mt-0.5 size-4 shrink-0"}
            />
            <p className={"text-sm/none"}>{errorMessage}</p>
        </div>
    );
};

Modal.FooterLoading = ModalFooterLoading;
Modal.Header = ModalHeader;
Modal.FormError = FormError;
Modal.Footer = ModalFooter;
Modal.Content = ModalContent;
Modal.Panel = ModalPanel;

export default Modal;
