import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginFormSchema, LoginFormType } from "~/api/auth/login.ts";
import { FormField } from "~/utils/render-form-field.tsx";

const useManageLoginForm = (actionData?: LoginFormType) => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<LoginFormType>({
        resolver: zodResolver(LoginFormSchema),
    });

    const fields: FormField[] = [
        {
            name: "username",
            type: "text",
            label: "Username",
            register,
            hasError: !!actionData?.username || !!errors.username?.message,
        },
        {
            name: "password",
            type: "text",
            label: "Password",
            register,
            hasError: !!actionData?.password || !!errors.password?.message,
        },
    ];

    return { handleSubmit, fields };
};

export default useManageLoginForm;
