export default function OrderSummary({
  items,
  total,
  handleCheckout,
  allRequiredFieldsFilled,
  handleSubmit,
}: any) {
  return (
    <div className="flex flex-col bg-red-600 p-4 md:p-6 w-full text-white rounded-2xl md:rounded-3xl">
      <p className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">
        Order Summary
      </p>

      <div className="mb-4 md:mb-6 flex flex-col space-y-3">
        <div className="flex flex-row justify-between font-semibold text-sm md:text-base">
          <span>SUBTOTAL ({items?.length}) items</span>
          <span>£{total?.toFixed(2)}</span>
        </div>
        <div className="flex flex-row justify-between font-semibold text-sm md:text-base">
          <span>Delivery</span>
          <span>£{(29.5).toFixed(2)}</span>
        </div>
      </div>

      <div className="flex flex-row justify-between font-semibold mb-4 md:mb-5 pb-4 border-t border-white/30 pt-4">
        <span className="text-xl md:text-2xl">Total</span>
        <span className="text-xl md:text-2xl">
          £{(total + 29.5).toFixed(2)}
        </span>
      </div>

      <button
        onClick={handleSubmit(handleCheckout)}
        disabled={!allRequiredFieldsFilled || items.length === 0}
        form="checkout-form"
        type="submit"
        className={`
          rounded-full h-12 md:h-14 font-semibold text-base md:text-lg transition-all duration-200
          ${
            allRequiredFieldsFilled && items.length > 0
              ? "bg-white text-red-600 hover:bg-gray-100 hover:scale-105 cursor-pointer shadow-lg"
              : "bg-gray-300 text-gray-600 cursor-not-allowed opacity-70"
          }
        `}
      >
        Confirm & Pay
      </button>

      <span className="text-xs md:text-sm text-center mt-4 md:mt-6 opacity-90 leading-relaxed">
        By placing your order, you agree to CeX's Terms & Conditions.
      </span>
    </div>
  );
}
