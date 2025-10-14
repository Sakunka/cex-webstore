import { useQuery } from "@tanstack/react-query";

export default function useFilters(type: string) {
  const { isLoading, data, isError } = useQuery({
    queryKey: ["filters", type],
    queryFn: async () => {
      const response = await fetch(`api/${type}/filters`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server did not return JSON");
      }

      return response.json();
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return { isLoading, data, isError };
}
