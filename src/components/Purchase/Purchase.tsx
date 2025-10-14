import PurchaseDetails from "./PurchaseDetails";
import Loader from "../ui/Loader";
import PurchaseItem from "./PurchaseItem";
import { useOrders } from "@/hooks/useOrders";

export default function Purchase() {
  const { data, loading, error } = useOrders();

  if (loading) {
    return <Loader width={80} height={50} />;
  }

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">My Orders</h1>
      {data?.data.map((order, ind) => {
        return (
          <div key={ind} className="mb-6 border rounded-lg p-4">
            <PurchaseDetails order={order} key={ind} />
            <div className="p-3">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {order.items.map((item, ind) => (
                  <PurchaseItem item={item} key={ind} />
                ))}
              </div>
            </div>
          </div>
        );
      })}

      {data?.data.length === 0 && (
        <div className="text-center text-gray-500 py-8">No orders found.</div>
      )}
    </div>
  );
}
