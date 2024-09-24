import { useNavigation } from "react-router-dom";

interface UsePending<T = unknown> {
    formData: T | undefined;
    isSubmitting: boolean;
    isLoading: boolean;
    isBusy: boolean;
    headingLocation?: string;
}

/**
 * Returns an object with properties related to pending state.
 *
 * @returns {{
 *   formData: T | undefined,
 *   isSubmitting: boolean,
 *   isLoading: boolean
 * }}
 */
export const usePending = <T = unknown>(): UsePending<T> => {
    const navigation = useNavigation();

    const formData = navigation.formData
        ? (Object.fromEntries(navigation.formData) as T)
        : undefined;

    const isSubmitting = navigation.state === "submitting";
    const isLoading = navigation.state === "loading";
    return {
        formData,
        isSubmitting,
        isLoading,
        isBusy: navigation.state !== "idle",
        headingLocation: navigation.location?.pathname,
    };
};
