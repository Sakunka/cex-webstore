import { PopularItems } from "@/lib/api/PopularItems";
import { useQuery } from "@tanstack/react-query";

export const useLatest = (type: string) => {
  return useQuery({
    queryKey: [`latest-${type}`, type],
    queryFn: () => PopularItems(type),
    staleTime: Infinity,
    gcTime: 60 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 3,
  });
};
