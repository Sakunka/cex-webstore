import mongoose from "mongoose";

const phoneSchema = new mongoose.Schema(
  {
    name: String,
    network: String,
    OS: String,
    capacity: String,
    manufacturer: String,
    color: String,
    price: Number,
    count: Number,
    image: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

phoneSchema.virtual("type").get(function () {
  return "phone";
});

const Phone = mongoose.models.Phone || mongoose.model("Phone", phoneSchema);

export default Phone;
