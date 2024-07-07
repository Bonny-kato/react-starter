import { useActionData } from "react-router-dom";

const useTypeActionData = <T = unknown>() => {
    const actionData = useActionData();
    return actionData as T | undefined;
};

export default useTypeActionData;
