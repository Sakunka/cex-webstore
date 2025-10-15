import mongoose from "mongoose";
import Basket from "../models/Basket";
import Computing from "../models/Computing";
import Game from "../models/Game";
import Media from "../models/Media";
import Phone from "../models/Phone";

interface item {
  name: string;
  type: string;
  image: string;
  quantity: number;
  price: number;
  id: mongoose.Types.ObjectId;
}

type ModelType = "basket" | "game" | "computing" | "media" | "phone";

export default async function changeCount(items: item[]) {
  const models: Record<ModelType, any> = {
    basket: Basket,
    game: Game,
    computing: Computing,
    media: Media,
    phone: Phone,
  };

  const results = await Promise.all(
    items.map(async (item) => {
      const modelType = item.type.toLowerCase() as ModelType;
      const model = models[modelType];

      try {
        const updated = await model.findByIdAndUpdate(
          item.id,
          { $inc: { count: -item.quantity } },
          { new: true }
        );
        return updated;
      } catch (error) {
        return null;
      }
    })
  );

  return results;
}
