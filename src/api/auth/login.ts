import { z } from "zod";
import { post } from "~/utils/http-client.ts";

// --------------  validation schema --------------

export const LoginFormSchema = z.object({
    username: z.string({ message: "username must be a string" }),
    password: z.string({ message: "password must be a string" }),
});

export type LoginFormType = z.infer<typeof LoginFormSchema>;

// ------------ end validation schema -------------

export const login = async (credentials: LoginFormType) => {
    return await post("/api/login", credentials);
};
