import { z } from "zod";
import { validateApiResponse } from "~/utils/data-validator.server.ts";
import { get } from "~/utils/http-client.ts";
import { badRequest } from "~/utils/request";

// --------------  validation schema --------------

const UserSchema = z.object({
    message: z.string(),
});

export type UserType = z.infer<typeof UserSchema>;
// ------------ end validation schema -------------id:number,

export const getUsers = async (): Promise<UserType> => {
    const { data, error } = await get("/api/users");
    if (error) throw badRequest(error);
    console.log("[data]", data);
    return validateApiResponse<UserType>(data, UserSchema);
};
