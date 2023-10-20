import { FC } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { IModal } from "@/components/Modal";

const SlideOver: FC<IModal> = ({ onClose, open, children, dialogClass }) => {
    return (
        <Transition appear show={open} as={"div"}>
            <Dialog
                onClose={onClose}
                className={`${dialogClass} fixed top-0 h-full right-0 z-40`}
            >
                <Transition.Child
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Dialog.Overlay className="fixed  backdrop-blur-[1.5px] inset-0 bg-[#192B40]/70 transition-opacity" />
                </Transition.Child>

                <Transition.Child
                    className={"h-full relative"}
                    enter="transform transition ease-in-out duration-300 "
                    enterFrom=" translate-x-full"
                    enterTo="translate-x-0"
                    leave="transform transition ease-in-out duration-300 sm:duration-700"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                >
                    <div className={"h-full bg-white/70"}>{children}</div>
                </Transition.Child>
            </Dialog>
        </Transition>
    );
};
export default SlideOver;
