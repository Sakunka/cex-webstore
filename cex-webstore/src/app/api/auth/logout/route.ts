import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json(
      {
        success: true,
        message: "Successfully logged out",
      },
      { status: 200 }
    );

    response.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0, // Delete righttt nowww
      path: "/",
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { error: "Logout failed", message: error.message },
      { status: 500 }
    );
  }
}
