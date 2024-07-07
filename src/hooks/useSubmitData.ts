import { SubmitOptions, useSubmit } from "react-router-dom";

type UseSubmitData = (data: unknown, options?: SubmitOptions) => void;

/**
 * Function useSubmitData
 *
 * @description
 * @function useSubmitData
 * @description A custom React hook that provides a submit function.
 * The provided function is specific in its functionality as it stringifies the data before sending it to the server.
 * This process simplifies data handling in the client-server communication.
 *
 * @returns {UseSubmitData} This hook returns a function that takes two arguments: 'data' and 'options'.
 * 'data' is the data you want to send to the server, and it's mandatory - can be of any type.
 * 'options' parameter is optional and allows you to customize the submit options.
 **/

const useSubmitData = (): UseSubmitData => {
    const submit = useSubmit();

    return (data: unknown, options?: SubmitOptions) => {
        submit(
            { data: JSON.stringify(data) },
            {
                method: "post",
                ...options,
            },
        );
    };
};

export default useSubmitData;
