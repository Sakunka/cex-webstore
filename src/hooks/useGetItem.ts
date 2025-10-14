import { GetItem } from "@/lib/api/getItem";
import { useQuery } from "@tanstack/react-query";

export default function useGetItem(type: string, id: string) {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["item_page", type, id],
    queryFn: async () => {
      const result = await GetItem(type, id);
      return result.data;
    },
    enabled: !!type && !!id,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return { isLoading, data, isError, error };
}
