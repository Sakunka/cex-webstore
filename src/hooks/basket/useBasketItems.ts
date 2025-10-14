import { useQuery } from "@tanstack/react-query";

async function getBasketItems() {
  const baseUrl = window.location.origin;
  const url = `${baseUrl}/api/basket`;
  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `HTTP ${response.status}`);
  }

  const result = await response.json();

  return result.data;
}

export function useBasketItems() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["basket", "items"],
    queryFn: getBasketItems,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return {
    items: data || [],
    isLoading,
    isError,
    error,
    refetch,
  };
}
