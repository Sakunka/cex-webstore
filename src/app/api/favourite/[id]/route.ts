import Favourite from "@/lib/models/Favourite";
import { connectDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Favourite ID is required" },
        { status: 400 }
      );
    }

    const deletedFavourite = await Favourite.findByIdAndDelete(id);

    if (!deletedFavourite) {
      return NextResponse.json(
        { error: "Favourite not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Successfully removed from favourites" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
