import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import ConcertModel from "@/models/Concert.model";
import { isValidObjectId } from "mongoose";

export async function GET(request: Request, { params }: { params: { artistid: string } }) {
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const artistId = searchParams.get('id');

  if (!artistId || !isValidObjectId(artistId)) {
    return NextResponse.json({ success: false, message: "Invalid artist ID" }, { status: 400 });
  }

  try {
    const artist = await UserModel.findById(artistId);
    if (!artist) {
      return NextResponse.json({ success: false, message: "Artist not found" }, { status: 404 });
    }

    const concerts = await ConcertModel.find({ artistId });
    console.log(concerts);
    console.log(artist);

    return NextResponse.json({ success: true, data: artist, concerts }, { status: 200 });
  } catch (error) {
    console.error("Error fetching artist details:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch artist" }, { status: 500 });
  }
}
