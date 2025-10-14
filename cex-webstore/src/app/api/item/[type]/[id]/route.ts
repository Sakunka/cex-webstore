import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Game from "@/lib/models/Game";
import Phone from "@/lib/models/Phone";
import Computing from "@/lib/models/Computing";
import Media from "@/lib/models/Media";

const modelMap = {
  game: Game,
  phone: Phone,
  computing: Computing,
  media: Media,
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ type: string; id: string }> }
) {
  try {
    await connectDB();

    const { type, id } = await params;

    const Model = modelMap[type.toLowerCase()];
    if (!Model) {
      return NextResponse.json(
        { message: `Invalid type: ${type}` },
        { status: 400 }
      );
    }

    const item = await Model.findById(id);

    if (!item) {
      return NextResponse.json(
        { message: `${type} not found` },
        { status: 404 }
      );
    }
    return NextResponse.json({
      message: `Found ${type}`,
      data: item,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: `Could not find this ${params.type}`,
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
