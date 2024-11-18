import { useQuery } from "@tanstack/react-query";
import { getUsers } from "~/api/users";

const userQueryKeys = {
    users: ["users"] as const,
    /// others keys ..
};

export const useGetUsers = () => {
    return useQuery({
        queryFn: getUsers,
        queryKey: userQueryKeys.users,
    });
};
