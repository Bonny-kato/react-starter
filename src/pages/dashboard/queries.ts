import { useQueries } from "@tanstack/react-query";
import { getUsers } from "@/api/end-points.ts";
import { TQueryOptions } from "@/types";

// This file is in charge of managing all logic related to data querying, including caching mechanisms and the exporting of reusable logic for further data querying.
export const dashboardQueryKeys = {
    users: ["all-users"] as const,
};

export const useUsers = (options?: TQueryOptions) => {
    return useQueries(dashboardQueryKeys.users, getUsers, options);
};
