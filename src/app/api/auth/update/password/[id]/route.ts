import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";
import { authenticate } from "@/lib/auth/middleware";
import bcrypt from "bcrypt";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const currentUser = await authenticate(request);

    console.log(currentUser);

    const { id } = await params;

    if (currentUser._id.toString() !== id) {
      return NextResponse.json(
        {
          success: false,
          message: "You don't have permission for this action",
        },
        { status: 403 }
      );
    }

    const { newPassword, confirmPassword } = await request.json();

    if (!newPassword || !confirmPassword) {
      return NextResponse.json(
        { success: false, message: "Password are not the same" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        password: hashedPassword,
      },
      {
        new: true,
        runValidators: true,
        select: "-password",
      }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: "User was not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Password was successfully updated, log in again",
      user: updatedUser,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
