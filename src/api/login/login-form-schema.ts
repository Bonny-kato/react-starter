import { z } from "zod";
import { NoneEmptyStringSchema } from "~/utils/zodCommon.ts";

// --------------  validation schema --------------

export const LoginFormSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export type LoginFormType = z.infer<typeof LoginFormSchema>;

//--------------------------------------------------------------

export const AuthUserSchema = z.object({
    id: NoneEmptyStringSchema("id"),
    fullName: NoneEmptyStringSchema("fullName"),
    email: z.string().email({ message: "invalid email address" }),
    avatar: z.string().url({ message: "invalid avatar url" }),
    token: NoneEmptyStringSchema("token"),
});

export type AuthUserType = z.infer<typeof AuthUserSchema>;

// ------------ end validation schema -------------
