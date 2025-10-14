import { useEffect } from "react";
import { useBasketCalculations } from "@/hooks/basket/useBasketCalculate";
import useBasketActions from "@/hooks/basket/useBasketActions";

export default function BasketSummary({ arr }: any) {
  const { subtotal, itemCount } = useBasketCalculations(arr);
  const { handleCheckout } = useBasketActions();

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6 mx-auto flex flex-col justify-center my-10">
      <h3 className="hidden md:block text-capitalize text-xl font-semibold mb-6">
        Order Summary
      </h3>

      <div className="mb-6 md:mb-4">
        <div className="flex justify-between mb-4 md:mb-2">
          <span className="uppercase font-medium">
            Subtotal ({itemCount} items)
          </span>
          <span className="font-semibold text-lg">{subtotal}</span>
        </div>
      </div>

      <button
        className="w-full bg-white border border-gray-300 rounded-md py-3 font-semibold text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        onClick={() => handleCheckout(arr, subtotal)}
      >
        Proceed to Checkout
      </button>
    </div>
  );
}
