import mongoose from "mongoose";

const computingSchema = new mongoose.Schema(
  {
    price: Number,
    ram: Number,
    cpu: String,
    screen_size: String,
    storage: String,
    manufacturer: String,
    gpu: String,
    os: String,
    image: String,
    count: Number,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

computingSchema.virtual("type").get(function () {
  return "computing";
});

const Computing =
  mongoose.models.Computing || mongoose.model("Computing", computingSchema);

export default Computing;
