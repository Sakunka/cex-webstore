import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { displayItems } from "@/lib/features/checkout/checkoutSlice";

export default function useBasketActions() {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleCheckout = (items: any, total: number) => {
    dispatch(displayItems({ total, items }));
    router.push("/checkout");
  };

  return { handleCheckout };
}
