import { useEffect, useState } from "react";

export function useSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    const timeoutId = setTimeout(async () => {
      if (searchTerm && searchTerm.trim() !== "" && searchTerm.length >= 3) {
        setLoading(true);
        setError(null);

        try {
          const response = await fetch(`/api/search/${searchTerm}`, {
            method: "GET",
            signal: abortController.signal,
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          setResults(data);
        } catch (err) {
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setLoading(false);
        }
      } else {
        setResults(null);
      }
    }, 800);

    return () => {
      clearTimeout(timeoutId);
      abortController.abort();
    };
  }, [searchTerm]);

  return { searchTerm, setSearchTerm, results, loading, error };
}
