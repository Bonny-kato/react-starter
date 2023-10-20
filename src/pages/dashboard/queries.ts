import { useQuery } from "@tanstack/react-query";

import { getUsers } from "@/api/users";
import type { TQueryOptions } from "@/types";

// This file is in charge of managing all logic related to data querying, including caching mechanisms and the exporting of reusable logic for further data querying.
export const dashboardQueryKeys = {
    users: ["all-users"] as const,
};

export const useUsers = (options?: TQueryOptions) => {
    return useQuery(dashboardQueryKeys.users, getUsers, options);
};
