export default function OrderSummary({
  items,
  total,
  handleCheckout,
  allRequiredFieldsFilled,
  handleSubmit,
}: any) {
  return (
    <div className="flex flex-col bg-red-600 h-3/5 p-6 w-2/6 text-white rounded-3xl justify-center mx-auto">
      <p className="text-2xl font-semibold mb-6">Order Summary</p>
      <div className="mb-6 flex flex-col">
        <div className="flex flex-row justify-between font-semibold">
          <span>SUBTOTAL ({items?.length})items</span>
          <span>£{total?.toFixed(2)}</span>
        </div>
        <div className="flex flex-row justify-between font-semibold">
          <span>Delivery</span>
          <span>£{(29.5).toFixed(2)}</span>
        </div>
      </div>

      <div className="flex flex-row justify-between font-semibold">
        <span className="text-2xl mb-5">Total</span>
        <span>£{(total + 29.5).toFixed(2)}</span>
      </div>
      <button
        onClick={handleSubmit(handleCheckout)}
        disabled={!allRequiredFieldsFilled || items.length === 0}
        form="checkout-form"
        type="submit"
        className={`
            rounded-4xl h-12 transition-colors duration-200
            ${
              allRequiredFieldsFilled && items.length > 0
                ? "bg-white text-black hover:bg-gray-100 cursor-pointer"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }
          `}
      >
        Confirm & Pay
      </button>
      <span className="text-[12px] text-center mt-6">
        By placing your order, you agree to CeX's Terms & Conditions.
      </span>
    </div>
  );
}
