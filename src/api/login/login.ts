import { LoginFormType } from "~/api/login/login-form-schema.ts";
import { post } from "~/utils/httpClient.ts";

export const login = async (formData: LoginFormType) => {
    return post("/login", formData);
};
