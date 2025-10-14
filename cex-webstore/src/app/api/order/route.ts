import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/lib/models/Order";
import { authenticate } from "@/lib/auth/middleware";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const user = await authenticate(request);

    const orders = await Order.find({
      userId: user._id,
    }).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      message: "Orders retrieved successfully",
      data: orders,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Error retrieving orders",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const user = await authenticate(request);
    const { data, basketItems } = await request.json();

    if (!data || !basketItems || basketItems.length === 0) {
      return NextResponse.json(
        { message: "Missing required order data" },
        { status: 400 }
      );
    }

    const requiredFields = [
      "full_name",
      "contact_number",
      "address_1",
      "country",
      "town_city",
      "postcode",
    ];
    for (const field of requiredFields) {
      if (!data[field] || data[field].trim() === "") {
        return NextResponse.json(
          { message: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    let subtotal = 0;
    const processedItems = [];

    for (const item of basketItems) {
      if (!item.price || !item.name || !item.type) {
        return NextResponse.json(
          { message: "Invalid item data" },
          { status: 400 }
        );
      }

      const itemPrice = parseFloat(item.price);
      const quantity = parseInt(item.quantity) || 1;
      const totalPrice = itemPrice * quantity;

      subtotal += totalPrice;

      processedItems.push({
        name: item.name,
        type: item.type,
        image: item.image || "",
        quantity: quantity,
        price: itemPrice,
      });
    }

    const deliveryFee = 29.5;
    const total = subtotal + deliveryFee;

    const orderData = {
      userId: user._id,
      shippingInfo: {
        fullName: data.full_name.trim(),
        organization: data.organization?.trim() || "",
        contactNumber: data.contact_number.trim(),
        address1: data.address_1.trim(),
        address2: data.address2?.trim() || data.address_2?.trim() || "",
        country: data.country.trim(),
        townCity: data.town_city.trim(),
        postcode: data.postcode.trim(),
      },
      items: processedItems,
      pricing: {
        subtotal: parseFloat(subtotal.toFixed(2)),
        deliveryFee: deliveryFee,
        total: parseFloat(total.toFixed(2)),
      },
      status: "PENDING",
    };

    const newOrder = await Order.create(orderData);

    const estimatedDelivery = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    return NextResponse.json(
      {
        success: true,
        message: "Order created successfully",
        order: {
          id: newOrder._id,
          orderNumber: newOrder.orderNumber,
          status: newOrder.status,
          total: newOrder.pricing.total,
          estimatedDelivery: estimatedDelivery,
          createdAt: newOrder.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Error creating order",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
