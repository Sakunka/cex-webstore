import { Items } from "@/lib/api/Items";
import { useQuery } from "@tanstack/react-query";

export const useItems = (type: string, currentPage: number, filters: any) => {
  return useQuery({
    queryKey: [type, currentPage, filters],
    queryFn: () => Items(type, currentPage, filters),
    placeholderData: {
      items: [],
    },
    staleTime: Infinity,
    gcTime: 60 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 3,
  });
};
