import mongoose from "mongoose";
const { Schema } = mongoose;

const basketSchema = new mongoose.Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "users" },
    itemId: {
      type: Schema.Types.ObjectId,
      refPath: "itemType",
    },
    itemType: {
      type: String,
      required: true,
      enum: ["Game", "Phone", "Computing", "Media"],
    },
    amount: Number,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Basket = mongoose.models.Basket || mongoose.model("Basket", basketSchema);

export default Basket;
