import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import { isValidObjectId } from "mongoose";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  await dbConnect();

  const artistId = params.id;

  if (!isValidObjectId(artistId)) {
    return NextResponse.json({ success: false, message: "Invalid artist ID" }, { status: 400 });
  }

  try {
    const artist = await UserModel.findById(artistId).populate('concerts');

    if (!artist) {
      return NextResponse.json({ success: false, message: "Artist not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: artist }, { status: 200 });
  } catch (error) {
    console.error("Error fetching artist details:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch artist" }, { status: 500 });
  }
}
