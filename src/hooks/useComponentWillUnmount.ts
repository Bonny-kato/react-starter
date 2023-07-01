import { useEffect, useState } from "react";

type Callback = () => void

const useComponentWillUnmount = (callback: Callback) => {
    const [didMount, setDidMount] = useState(false);

    useEffect(() => {
        setDidMount(true);
        return () => {
            if (didMount) {
                callback();
            }
        };
    }, [didMount]);

};
export default useComponentWillUnmount;
