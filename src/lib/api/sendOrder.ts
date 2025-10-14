import { toast } from "react-toastify";

export async function sendOrder(data: any, router: any) {
  try {
    const response = await fetch(`/api/order/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json();
      toast.success("Order placed successfully!");
      router.push("/");
      return { success: true, data: result };
    } else {
      const error = await response.json();
      toast.error("Order failed");
      return { success: false, error: error.message };
    }
  } catch (err) {
    toast.error("Network error - please try again");
    return { success: false, error: "Network error" };
  }
}
