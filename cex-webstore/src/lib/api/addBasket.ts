import type { Types } from "mongoose";
import { toast } from "react-toastify";

export const addBasket = async (id: Types.ObjectId, type: string) => {
  const toastId = toast.loading("Adding to basket...");
  try {
    const typeMap: { [key: string]: string } = {
      game: "Game",
      phone: "Phone",
      computing: "Computing",
      media: "Media",
    };

    const itemType = typeMap[type.toLowerCase()] || type;

    const response = await fetch(`/api/basket/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        _id: id.toString(),
        itemType: itemType,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage;
      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.message || "Unknown error";
      } catch {
        errorMessage = errorText || "Server error";
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();

    toast.update(toastId, {
      render: "Item added to basket successfully!",
      type: "success",
      isLoading: false,
      autoClose: 2000,
    });

    return data;
  } catch (error: any) {
    toast.update(toastId, {
      render: error.message || "Failed to add item to basket",
      type: "error",
      isLoading: false,
      autoClose: 2000,
    });

    throw error;
  }
};
