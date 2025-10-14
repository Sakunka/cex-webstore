import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";
import { authenticate } from "@/lib/auth/middleware";
import mongoose from "mongoose";
import Order from "@/lib/models/Order";
import Basket from "@/lib/models/Basket";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const currentUser = await authenticate(request);

    if (!currentUser) {
      return NextResponse.json(
        { success: false, message: "Not authenticated" },
        { status: 401 }
      );
    }

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid user ID format" },
        { status: 400 }
      );
    }

    if (currentUser._id.toString() !== id) {
      return NextResponse.json(
        {
          success: false,
          message: "You don't have permission for this action",
        },
        { status: 403 }
      );
    }

    const existingUser = await User.findById(id);

    if (!existingUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: { isActive: false } },
      {
        new: true,
        runValidators: true,
        select: "-password",
      }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: "Failed to update user" },
        { status: 500 }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: "Account has been successfully cancelled",
      isActive: updatedUser.isActive,
    });

    response.cookies.delete("token");

    await Order.deleteMany({ userId: id });
    await Basket.deleteMany({ userId: id });

    return response;
  } catch (error: any) {
    console.error("Cancel account error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
