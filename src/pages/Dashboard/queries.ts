// ⚠️ This file is in charge of managing all logic related to data querying, including caching mechanisms and the exporting of reusable logic for further data querying.

import { useQuery } from "@tanstack/react-query";

import { getUsers } from "~/api/users";
import type { QueryOptions } from "~/types";

export const dashboardQueryKeys = {
    users: ["all-users"] as const,
};

export const useUsers = (options?: QueryOptions) => {
    return useQuery(dashboardQueryKeys.users, getUsers, options);
};
