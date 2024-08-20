// src/app/api/concerts/[id]/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import ConcertModel from "@/models/Concert.model";
import { isValidObjectId } from "mongoose";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  await dbConnect();

  const concertId = params.id;

  if (!isValidObjectId(concertId)) {
    return NextResponse.json({ success: false, message: "Invalid concert ID" }, { status: 400 });
  }

  try {
    const concert = await ConcertModel.findById(concertId);
    if (!concert) {
      return NextResponse.json({ success: false, message: "Concert not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: concert }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to fetch concert" }, { status: 500 });
  }
}
