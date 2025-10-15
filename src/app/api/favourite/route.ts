import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Favourite from "@/lib/models/Favourite";
import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";

export async function GET(request) {
  try {
    await connectDB();
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Token not found" }, { status: 401 });
    }

    const secret = process.env.ACCESS_TOKEN_SECRET;
    if (!secret) {
      return NextResponse.json(
        { message: "Server configuration error" },
        { status: 500 }
      );
    }

    const decoded = jwt.verify(token, secret);
    const user = decoded as any;

    const userId = user.userId || user._id || user.id;

    if (!userId) {
      return NextResponse.json(
        { message: "Invalid token payload" },
        { status: 400 }
      );
    }

    const favourites = await Favourite.find({
      user: userId,
    }).lean();

    if (favourites.length === 0) {
      return NextResponse.json({
        message: "Favourites retrieved successfully",
        data: [],
      });
    }

    const itemsWithData = await Promise.all(
      favourites.map(async (fav) => {
        let item = null;

        try {
          if (fav.itemType === "Game") {
            item = await mongoose.model("Game").findById(fav.itemId).lean();
          } else if (fav.itemType === "Phone") {
            item = await mongoose.model("Phone").findById(fav.itemId).lean();
          } else if (fav.itemType === "Computing") {
            item = await mongoose
              .model("Computing")
              .findById(fav.itemId)
              .lean();
          } else if (fav.itemType === "Media") {
            item = await mongoose.model("Media").findById(fav.itemId).lean();
          }
        } catch (modelError) {
          throw modelError;
        }

        return {
          _id: fav._id,
          user: fav.user,
          itemId: fav.itemId,
          itemType: fav.itemType,
          item: item || null,
        };
      })
    );

    return NextResponse.json({
      message: "Favourites retrieved successfully",
      data: itemsWithData,
    });
  } catch (error: any) {
    if (error.name === "JsonWebTokenError") {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    return NextResponse.json(
      {
        message: "Error finding items from the favourites",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
