import { Types } from "mongoose";
import { toast } from "react-toastify";

export const addFavourite = async (id: Types.ObjectId, type: string) => {
  const toastId = toast.loading("Adding to basket...");

  try {
    const response = await fetch(`/api/favourite/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        _id: id,
        itemType: type.toLowerCase(),
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    toast.update(toastId, {
      render: "Item added to favourites!",
      type: "success",
      isLoading: false,
      autoClose: 2000,
    });

    return data;
  } catch (error: any) {
    toast.update(toastId, {
      render: "You already have this item in favourites",
      type: "error",
      isLoading: false,
      autoClose: 2000,
    });
    throw error;
  }
};
