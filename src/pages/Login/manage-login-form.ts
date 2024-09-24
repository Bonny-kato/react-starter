import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    LoginFormSchema,
    LoginFormType,
} from "~/api/login/login-form-schema.ts";
import { FormField } from "~/utils/renderFormField.tsx";

export const useManageLoginForm = () => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<LoginFormType>({
        resolver: zodResolver(LoginFormSchema),
    });

    const fields: FormField<LoginFormType>[] = [
        {
            name: "email",
            label: "Email",
            hasError: !!errors.email?.message,
            register,
        },

        {
            name: "password",
            label: "Password",
            type: "password",
            hasError: !!errors.password?.message,
            register,
        },
    ];

    return { handleSubmit, fields };
};
