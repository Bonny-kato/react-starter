import { useMutation } from "@tanstack/react-query";
import { AuthUserSchema, AuthUserType } from "~/api/login/login-form-schema.ts";
import { login } from "~/api/login/login.ts";
import { useAuth } from "~/auth";
import { validateApiResponse } from "~/utils/dataValidator.ts";
import { throwError } from "~/utils/request.ts";
import { SafeExecuteReturnType } from "~/utils/safeExcute.ts";

export const useLogin = () => {
    const { saveAuthUser } = useAuth();

    const handleSuccess = (response: SafeExecuteReturnType<AuthUserType>) => {
        const [error, data] = response;
        if (error) throwError(error);

        const validatedData = validateApiResponse<AuthUserType>(
            data,
            AuthUserSchema,
        );
        const { token, ...rest } = validatedData;

        saveAuthUser(rest, token);
    };

    const handleError = (error: unknown) => {
        throw error;
    };

    return useMutation({
        mutationFn: login,
        mutationKey: ["login"],
        onSuccess: handleSuccess,
        onError: handleError,
    });
};
