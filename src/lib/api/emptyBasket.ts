import Basket from "../models/Basket";

export default async function emptyBasket(id) {
  try {
    if (!id) {
      console.log("This is not a valid ID");
    }
    const result = await Basket.deleteMany({ user: id });
    return result;
  } catch (error) {
    throw new Error(error);
  }
}
