import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";
import { authenticate } from "@/lib/auth/middleware";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const currentUser = await authenticate(request);

    const { id } = await params;

    if (currentUser._id.toString() !== id) {
      return NextResponse.json(
        { success: false, message: "Nemate dozvolu za ovu akciju" },
        { status: 403 }
      );
    }

    const { firstName, lastName } = await request.json();

    if (!firstName || !lastName) {
      return NextResponse.json(
        { success: false, message: "Ime i prezime su obavezni" },
        { status: 400 }
      );
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      },
      {
        new: true,
        runValidators: true,
        select: "-password",
      }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: "Korisnik nije pronadjen" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Korisnik uspjesno azuriran",
      user: updatedUser,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Interna greska servera" },
      { status: 500 }
    );
  }
}
