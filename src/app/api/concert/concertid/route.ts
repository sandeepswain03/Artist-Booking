import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import ConcertModel from "@/models/Concert.model";
import { isValidObjectId } from "mongoose";

export async function GET(request: Request) {
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const concertId = searchParams.get('id');

  if (!concertId || !isValidObjectId(concertId)) {
    return NextResponse.json({ success: false, message: "Invalid concert ID" }, { status: 400 });
  }

  try {
    const concert = await ConcertModel.findById(concertId).populate('artistId', 'username email');
    if (!concert) {
      return NextResponse.json({ success: false, message: "Concert not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: concert }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to fetch concert" }, { status: 500 });
  }
}
