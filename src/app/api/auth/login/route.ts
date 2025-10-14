import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";
import { signToken } from "@/lib/auth/jwt";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email i password su obavezni" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "That user does not exist" },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Data was not correct" },
        { status: 401 }
      );
    }

    console.log("User", user);

    if (!user?.isActive) {
      return NextResponse.json(
        { message: "This account was deactivated" },
        { status: 401 }
      );
    }

    const token = signToken({
      _id: user._id,
      role: user.role,
      lastName: user.lastName,
      firstName: user.firstName,
      email: user.email,
    });

    const response = NextResponse.json(
      {
        message: "Uspjesna prijava",
        user: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          shippingInfo: user?.shippingInfo,
        },
        token,
      },
      { status: 200 }
    );

    const host = request.headers.get("host") || "";
    const isNetworkHost =
      host.includes("192.168") || !host.includes("localhost");

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { message: "Neuspjesna prijava", error: error.message },
      { status: 500 }
    );
  }
}
