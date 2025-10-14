import { operationBasket } from "@/lib/api/operationBasket";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import { toast } from "react-toastify";

export default function BasketItem({
  item,
  handleDelete,
}: {
  item: any;
  handleDelete: (id: string) => Promise<void>;
}) {
  const [isUpdating, setIsUpdating] = useState(false);

  const maxItems = useMemo(
    () => item.amount >= item.itemId.count,
    [item.amount, item.itemId.count]
  );

  const handleAmount = useCallback(
    async (operation: string) => {
      if (operation === "inc" && maxItems) {
        toast.warn(
          "You have exceeded the amount of items available for this product"
        );
        return;
      }

      if (operation === "dec" && item.amount <= 1) {
        toast.warn("Minimum quantity is 1");
        return;
      }

      setIsUpdating(true);
      try {
        await operationBasket(setIsUpdating, operation, item);
      } catch (error) {
        toast.error("Failed to update quantity");
        setIsUpdating(false);
      }
    },
    [isUpdating, maxItems, item]
  );

  return (
    <div className="w-full md:w-4/5 flex bg-white rounded-xl shadow-md overflow-hidden">
      <div className="flex-shrink-0">
        <div className="w-32 h-30">
          <Image
            src={item?.itemId.image}
            alt={item.itemId.name}
            width={100}
            height={100}
          />
        </div>
      </div>

      <div className="flex-1 p-4">
        <div className="flex justify-between items-start mb-3">
          <p className="text-lg font-semibold text-gray-900 line-clamp-2 pr-2">
            {item.itemId.name}
          </p>

          <button
            type="button"
            onClick={() => handleDelete(item.id)}
            className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-red-600 hover:text-red-800 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 rounded transition-colors"
          >
            ×
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-gray-900">
            £{item.itemId.price}
          </div>

          <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
            <button
              onClick={() => handleAmount("dec")}
              disabled={isUpdating || item.amount <= 1}
              type="button"
              className={`px-3 py-1 transition-colors ${
                isUpdating || item.amount <= 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              -
            </button>
            <input
              type="number"
              min="1"
              max="5"
              readOnly
              value={item?.amount}
              className="w-12 text-center border-l border-r border-gray-300 py-1 focus:outline-none bg-gray-50"
            />
            <button
              type="button"
              onClick={() => handleAmount("inc")}
              disabled={isUpdating}
              className={`px-3 py-1 transition-color`}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
