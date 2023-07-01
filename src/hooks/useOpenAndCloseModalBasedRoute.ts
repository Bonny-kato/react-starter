import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Callback = () => void;

type TUseOpenAndCloseModalBasedRoute = {
    open: boolean;
    closeModal: () => void;
};

const useOpenAndCloseModalBasedRoute = (
    callback?: Callback
): TUseOpenAndCloseModalBasedRoute => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setOpen(true);
    }, []);

    const closeModal = useCallback(
        (navigateBack = true) => {
            setOpen(false);

            setTimeout(() => {
                if (callback) {
                    callback();
                }
                navigate(-1);
            }, 300);
        },
        [callback, navigate]
    );

    return { open, closeModal };
};

export default useOpenAndCloseModalBasedRoute;
