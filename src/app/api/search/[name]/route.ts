import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Phone from "@/lib/models/Phone";
import Game from "@/lib/models/Game";
import Computing from "@/lib/models/Computing";
import Media from "@/lib/models/Media";

export async function GET(
  request: NextRequest,
  { params }: { params: { name: string } }
) {
  try {
    await connectDB();

    const { name } = await params;

    if (!name || name.trim() === "") {
      return NextResponse.json(
        { message: "Search term is required" },
        { status: 400 }
      );
    }

    const searchTerm = decodeURIComponent(name);

    const searchPromises = await Promise.allSettled([
      Phone.find({
        name: { $regex: searchTerm, $options: "i" },
      }).select("name _id type"),

      Game.find({
        name: { $regex: searchTerm, $options: "i" },
      }).select("name _id type"),

      Computing.find({
        name: { $regex: searchTerm, $options: "i" },
      }).select("name _id type"),

      Media.find({
        name: { $regex: searchTerm, $options: "i" },
      }).select("name _id type"),
    ]);

    const results = searchPromises.map((item, index) => {
      const typeNames = ["phones", "games", "computing", "media"];

      if (item.status === "fulfilled") {
        return {
          type: typeNames[index],
          data: item.value,
          success: true,
          count: item.value.length,
        };
      } else {
        return {
          type: typeNames[index],
          error: item.reason?.message || "Unknown error",
          success: false,
          count: 0,
        };
      }
    });

    const totalResults = results.reduce((sum, result) => {
      return sum + (result.success ? result.count : 0);
    }, 0);

    return NextResponse.json({
      message: "Search completed",
      searchTerm: searchTerm,
      totalResults,
      results: results,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal server error during search",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
