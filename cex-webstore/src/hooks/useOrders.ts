import { useEffect, useState } from "react";

export function useOrders() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    async function getOrders() {
      try {
        setLoading(true);
        const response = await fetch(`/api/order/`, {
          method: "GET",
          credentials: "include",
          signal: abortController.signal,
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    }

    getOrders();

    return () => {
      abortController.abort();
    };
  }, []);

  return { data, loading, error };
}
