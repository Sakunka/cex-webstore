import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/lib/models/Order";
import { authenticate } from "@/lib/auth/middleware";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const user = await authenticate(request);
    const { id } = await params;

    const order = await Order.findOne({
      _id: id,
      userId: user._id, // Provjera korisnika ali samo za sebe
    });

    if (!order) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Order retrieved successfully",
      data: order,
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
        message: "Error retrieving order",
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
    const { status } = await request.json();

    const order = await Order.findById(id);
    if (!order) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    if (
      order.userId.toString() !== user._id.toString() &&
      user.role !== "admin"
    ) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 403 }
      );
    }
    const validStatuses = [
      "PENDING",
      "CONFIRMED",
      "PROCESSING",
      "SHIPPED",
      "DELIVERED",
      "CANCELLED",
    ];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, message: "Invalid status" },
        { status: 400 }
      );
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status, updatedAt: new Date() },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      message: "Order status updated successfully",
      data: updatedOrder,
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
        message: "Error updating order",
        error: error.message,
      },
      { status: 500 }
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

    const order = await Order.findById(id);
    if (!order) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    if (
      order.userId.toString() !== user._id.toString() &&
      user.role !== "admin"
    ) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 403 }
      );
    }

    if (!["PENDING", "CANCELLED"].includes(order.status)) {
      return NextResponse.json(
        { success: false, message: "Cannot delete order with current status" },
        { status: 400 }
      );
    }

    await Order.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Order deleted successfully",
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
        message: "Error deleting order",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
