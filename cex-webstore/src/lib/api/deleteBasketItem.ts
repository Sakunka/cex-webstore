export async function deleteBasketItem(id: string) {
  const response = await fetch(`/api/basket/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete item");
  }

  return await response.json();
}
