import mongoose from "mongoose";

const gameSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    year: Number,
    genre: String,
    publisher: String,
    pegi_rating: String,
    description: String,
    image: String,
    count: Number,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

gameSchema.virtual("type").get(function () {
  return "Game";
});

const Game = mongoose.models.Game || mongoose.model("Game", gameSchema);

export default Game;
