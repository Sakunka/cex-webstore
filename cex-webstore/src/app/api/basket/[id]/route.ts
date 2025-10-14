import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Basket from "@/lib/models/Basket";
import { authenticate } from "@/lib/auth/middleware";
import mongoose from "mongoose";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const user = await authenticate(request);
    const { id } = await params;

    const existingItem = await Basket.findOne({
      itemId: id,
      user: user._id,
    }).populate("itemId");

    if (existingItem) {
      return NextResponse.json({
        message: "Item exists in basket",
        answer: true,
        item: existingItem,
      });
    } else {
      return NextResponse.json({
        message: "Item not found in basket",
        answer: false,
      });
    }
  } catch (error: any) {
    if (error.message === "Authentication failed") {
      return NextResponse.json({ message: "Token not found" }, { status: 401 });
    }

    return NextResponse.json(
      {
        message: "Error checking basket",
        error: error.message,
      },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const user = await authenticate(request);
    const { id } = await params;

    const objectId = new mongoose.Types.ObjectId(id);

    const deletedItem = await Basket.findOneAndDelete({
      _id: objectId,
      user: user._id,
    });

    if (!deletedItem) {
      return NextResponse.json(
        { message: "Item not found in basket" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Item removed from basket successfully",
    });
  } catch (error: any) {
    if (error.message === "Authentication failed") {
      return NextResponse.json({ message: "Token not found" }, { status: 401 });
    }

    return NextResponse.json(
      {
        success: false,
        message: "Error removing item from basket",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const user = await authenticate(request);
    const { id } = await params;
    const { operation } = await request.json();
    const objectId = new mongoose.Types.ObjectId(id);

    const currentItem = await Basket.findOne({ _id: objectId, user: user._id });

    if (!currentItem) {
      return NextResponse.json(
        { message: "Item not found in basket" },
        { status: 404 }
      );
    }
    const increment = operation === "increment" ? 1 : -1;
    let newAmount = currentItem.amount + increment;

    newAmount = Math.max(1, Math.min(5, newAmount));

    const updatedItem = await Basket.findOneAndUpdate(
      { _id: objectId, user: user._id },
      { $set: { amount: newAmount } },
      { new: true }
    ).populate("item");

    return NextResponse.json({
      success: true,
      message: "Quantity updated successfully",
      item: updatedItem,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Error updating quantity",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
