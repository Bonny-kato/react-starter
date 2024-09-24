//⚠️ Improving type-safety

import { QueryKey } from "@tanstack/react-query";

import { queryClient } from "~/App";

type CacheData = any; // Define this according to your data type

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
                oldData.id === newData.id ? newData : oldData,
            ),
        }));
    };

// Removing from cache
export const useRemoveFromCache =
    () => (queryKey: QueryKey, newData: CacheData) => {
        queryClient.setQueryData(queryKey, (oldData: CacheData) => ({
            ...oldData,
            data: oldData.data.filter(
                (_data: CacheData) => _data?.id !== newData.id,
            ),
        }));
    };

export const useCacheData = <T>(queryKey: QueryKey, defaultValue: T): T => {
    const cachedData = queryClient.getQueryData<T>(queryKey);
    return cachedData || defaultValue;
};
