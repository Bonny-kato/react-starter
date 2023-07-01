import { QueryKey } from "react-query";
import { queryClient } from "@/App";

type TAction = "update" | "create" | "remove";
type CacheData = any; // Define this according to your data type

// Refreshing (invalidating or refetching) cache
export const useRefreshCache = () => {
    return (queryKey: QueryKey, hardReload?: boolean) =>
        hardReload
            ? queryClient.invalidateQueries(queryKey)
            : queryClient.refetchQueries(queryKey);
};

// Adding data to cache
export const useAddToCache = () => (queryKey: QueryKey, newData: CacheData) => {
    queryClient.setQueryData(queryKey, (oldQueryData: CacheData) => ({
        ...oldQueryData,
        data: [newData, ...oldQueryData.data],
    }));
};

// Updating cache
export const useUpdateCache =
    () => (queryKey: QueryKey, newData: CacheData) => {
        queryClient.setQueryData(queryKey, (oldQueryData: CacheData) => ({
            ...oldQueryData,
            data: oldQueryData.data.map((oldData: any) =>
                oldData.id === newData.id ? newData : oldData
            ),
        }));
    };

// Removing from cache
export const useRemoveFromCache =
    () => (queryKey: QueryKey, newData: CacheData) => {
        queryClient.setQueryData(queryKey, (oldData: CacheData) => ({
            ...oldData,
            data: oldData.data.filter(
                (_data: CacheData) => _data?.id !== newData.id
            ),
        }));
    };

export const saveValueToCache = <T>(queryKey: QueryKey, data: T) => {
    queryClient.setQueryData<T>(queryKey, data);
};

export const useCacheData = <T>(queryKey: QueryKey, defaultValue: any): T => {
    const cachedData = queryClient.getQueryData<T>(queryKey);
    return cachedData || defaultValue;
};

// Use the above hooks
export const useManageCache = () => {
    const refreshCache = useRefreshCache();
    const addToCache = useAddToCache();
    const updateCache = useUpdateCache();
    const removeFromCache = useRemoveFromCache();

    const manageCache = (
        queryKey: QueryKey,
        newData: CacheData,
        action: TAction
    ) => {
        switch (action) {
            case "create":
                addToCache(queryKey, newData);
                break;
            case "update":
                updateCache(queryKey, newData);
                break;
            case "remove":
                removeFromCache(queryKey, newData);
                break;
            default:
                throw new Error(
                    'Cache action must be either "create", "update" or "remove"'
                );
        }
    };

    return { refreshCache, manageCache };
};

export default useManageCache;
