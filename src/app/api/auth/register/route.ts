import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { firstName, lastName, email, password, role } = await request.json();

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { message: "Sva polja su obavezna" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Ovaj korisnik vec postoji" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      password: hashedPassword,
      email,
      role: role || "user",
    });

    return NextResponse.json(
      { message: "Korisnik uspjesno napravljen" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Greska pri kreiranju korisnika", error: error.message },
      { status: 500 }
    );
  }
}
