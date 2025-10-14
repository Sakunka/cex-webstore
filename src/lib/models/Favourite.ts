import mongoose from "mongoose";
const { Schema } = mongoose;

const favouriteSchema = new mongoose.Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "users" },
    itemId: { type: Schema.Types.ObjectId },
    itemType: {
      type: String,
      required: true,
      enum: ["game", "phone", "computing", "media"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

favouriteSchema.virtual("item", {
  ref: function (doc: any) {
    return doc.itemType;
  },
  localField: "itemId",
  foreignField: "_id",
  justOne: true,
});

const Favourite =
  mongoose.models.Favourite || mongoose.model("Favourite", favouriteSchema);

export default Favourite;
