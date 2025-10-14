import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Basket from "@/lib/models/Basket";
import { authenticate } from "@/lib/auth/middleware";
import Game from "@/lib/models/Game";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const user = await authenticate(request);
    const items = await Basket.find({ user: user._id }).populate("itemId");

    return NextResponse.json({
      message: "Items retrieved successfully",
      data: items,
    });
  } catch (error: any) {
    if (error.message === "Authentication failed") {
      return NextResponse.json({ message: "Token not found" }, { status: 401 });
    }

    return NextResponse.json(
      {
        message: "Error finding items from the basket",
        error: error.message,
      },
      { status: 400 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const user = await authenticate(request);
    if (!user || !user._id) {
      return NextResponse.json(
        { message: "Authentication failed" },
        { status: 401 }
      );
    }

    const { _id, itemType, amount = 1 } = await request.json();

    if (!_id || !itemType) {
      return NextResponse.json(
        { message: "Item ID and type are required" },
        { status: 400 }
      );
    }

    const updatedItem = await Basket.findOneAndUpdate(
      { user: user._id, itemId: _id },
      { $inc: { amount: amount } },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
        runValidators: true,
      }
    );

    if (!updatedItem.itemType) {
      updatedItem.itemType = itemType;
      await updatedItem.save();
    }

    return NextResponse.json({
      message: "Item added to basket successfully",
      item: updatedItem,
      id: updatedItem._id,
    });
  } catch (error: any) {
    if (error.message === "Authentication failed") {
      return NextResponse.json({ message: "Token not found" }, { status: 401 });
    }

    return NextResponse.json(
      {
        message: "Error adding item to basket",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await connectDB();

    const user = await authenticate(request);

    const result = await Basket.deleteMany({ user: user._id });

    return NextResponse.json({
      success: true,
      message: "Basket cleared successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error: any) {
    if (error.message === "Authentication failed") {
      return NextResponse.json(
        { success: false, message: "Token not found" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Error clearing basket",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
