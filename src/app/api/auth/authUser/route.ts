import { NextRequest, NextResponse } from "next/server";
import { authenticate } from "@/lib/auth/middleware";

export async function GET(request: NextRequest) {
  try {
    const user = await authenticate(request);

    return NextResponse.json({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      _id: user._id,
      shippingInfo: user.shippingInfo,
    });
  } catch (error: any) {
    const response = NextResponse.json(
      {
        message: "Error",
      },
      {
        status: error.message === "No token provided" ? 401 : 403,
      }
    );

    if (error.message !== "No token provided") {
      response.cookies.delete("token");
    }

    return response;
  }
}
