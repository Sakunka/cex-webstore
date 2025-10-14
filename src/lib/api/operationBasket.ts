export async function operationBasket(
  setIsUpdating: any,
  operation: string,
  item: any
) {
  try {
    const response = await fetch(`/api/basket/${item._id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ operation }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update quantity");
    }
  } catch (error) {
    alert("Failed to update quantity");
  } finally {
    setIsUpdating(false);
  }
}
