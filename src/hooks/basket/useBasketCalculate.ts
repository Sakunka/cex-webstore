export function useBasketCalculations(items: any) {
  const subtotal = items.reduce(
    (total: any, item: any) => total + item?.itemId.price * item.amount,
    0
  );

  const itemCount = items.length;

  return {
    subtotal,
    itemCount,
  };
}
