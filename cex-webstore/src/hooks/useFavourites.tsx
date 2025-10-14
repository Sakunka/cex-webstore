import { useEffect, useState } from "react";

export default function useFavourites() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function getFavourites() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/favourite", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      setItems(data?.data || []);
    } catch (error: any) {
      setError(error.message);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  async function deleteFavourite(id: string) {
    try {
      const response = await fetch(`/api/favourite/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      setItems((prev) =>
        prev.filter((item: any) => item._id.toString() !== id)
      );

      return true;
    } catch (error: any) {
      setError(error.message);
      return false;
    }
  }

  useEffect(() => {
    getFavourites();
  }, []);

  const refreshFavourites = () => {
    getFavourites();
  };

  return {
    items,
    loading,
    error,
    deleteFavourite,
    refreshFavourites,
  };
}
