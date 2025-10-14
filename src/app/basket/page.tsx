"use client";

import BasketItem from "@/components/Basket/BasketItem";
import BasketSummary from "@/components/Basket/BasketSummary";
import Loader from "@/components/ui/Loader";
import { useBasketItems } from "@/hooks/basket/useBasketItems";
import { deleteBasketItem } from "@/lib/api/deleteBasketItem";

export default function Basket() {
  const { items, isLoading, error, refetch } = useBasketItems();

  async function handleDelete(id: string) {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await deleteBasketItem(id);
        refetch();
      } catch (err) {}
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader width={60} height={60} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-red-500 text-center p-4">
          <h2 className="text-2xl font-bold mb-2">Error Loading Basket</h2>
          <p>{error?.message || "Failed to load basket items"}</p>
        </div>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold mb-4">Your basket is empty</h2>
        <p className="text-gray-600">Add some items</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 mt-6 w-full md:px-15">
      <div className="flex flex-col w-full md:w-3/4 space-y-6 mb-5">
        {items.map((item: any) => (
          <BasketItem key={item._id} item={item} handleDelete={handleDelete} />
        ))}
      </div>

      <div className="w-full lg:w-80 flex-shrink-0">
        <BasketSummary arr={items} />
      </div>
    </div>
  );
}
