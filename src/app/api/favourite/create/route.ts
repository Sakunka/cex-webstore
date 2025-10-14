import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Favourite from "@/lib/models/Favourite";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const token = request.cookies.get("token")?.value;

    const requestBody = await request.json();

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

    const { _id, itemType } = requestBody;

    console.log(_id, itemType);

    if (!_id || !itemType) {
      return NextResponse.json(
        { message: "itemId and itemType are required" },
        { status: 400 }
      );
    }

    const existing = await Favourite.findOne({
      user: userId,
      itemId: _id,
      itemType,
    });

    if (existing) {
      return NextResponse.json(
        { message: "Item already in favourites" },
        { status: 409 }
      );
    }

    const favourite = new Favourite({
      user: userId,
      itemId: _id,
      itemType,
    });

    await favourite.save();

    return NextResponse.json(
      { message: "Favourite added successfully", data: favourite },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.name === "JsonWebTokenError") {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    return NextResponse.json(
      {
        message: "Error creating favourite",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
