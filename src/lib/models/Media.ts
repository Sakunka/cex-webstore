import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    year: Number,
    genre: String,
    publisher: String,
    subtitles: String,
    age_rating: String,
    image: String,
    count: Number,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

mediaSchema.virtual("type").get(function () {
  return "Media";
});

const Media = mongoose.models.Media || mongoose.model("Media", mediaSchema);

export default Media;
