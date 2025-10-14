import { Types } from "mongoose";

type AddToBasketRequest = {
  _id: string | Types.ObjectId;
  itemType: "Game" | "Computing" | "Phone" | "Media";
  amount?: number;
};

export async function addToBasket(itemData: AddToBasketRequest) {
  try {
    const response = await fetch("/api/basket", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        _id: itemData._id,
        itemType: itemData.itemType,
        amount: itemData.amount || 1,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
