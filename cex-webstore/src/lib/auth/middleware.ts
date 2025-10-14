import { NextRequest } from "next/server";
import { verifyToken } from "./jwt";
import User from "@/lib/models/User";
import { connectDB } from "@/lib/mongodb";

export async function authenticate(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      throw new Error("No token provided");
    }

    const decoded = verifyToken(token) as any;

    await connectDB();

    const user = await User.findById(decoded._id).select("-password");

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error: any) {
    throw new Error("Authentication failed");
  }
}
