import UserModel from "@/models/User.model";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await dbConnect();
  try {
    const artists = await UserModel.find({ role: "artist" });

    return NextResponse.json(
      { success: true, data: artists },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching artists:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch artists" },
      { status: 500 }
    );
  }
}
