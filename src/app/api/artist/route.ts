import UserModel from "@/models/User.model";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import { Schema } from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

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


// Patch  Request 
export async function PATCH(request: Request) {
  await dbConnect();
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Not authenticated" },
        { status: 401 }
      );
    }
    const userId = session.user._id;
    const { artistId, rating } = await request.json();

    if (!artistId || !userId || rating === undefined) {
      return NextResponse.json(
        { success: false, message: "Invalid input data" },
        { status: 400 }
      );
    }

    // Check if the artist (user with role "artist") exists
    const artist = await UserModel.findOne({ _id: artistId, role: "artist" });
    if (!artist) {
      return NextResponse.json(
        { success: false, message: "Artist not found" },
        { status: 404 }
      );
    }

    // Check if the user has already rated the artist
    const existingRating = artist.rating?.ratings.find(
      (r) => r.userId.toString() === userId
    );

    if (existingRating) {
      // Update the existing rating
      existingRating.rating = rating;
    } else {
      // Add the new rating
      artist.rating?.ratings.push({
        userId: new Schema.Types.ObjectId(userId),
        rating,
      });
      artist.rating!.count += 1; // Increment the rating count
    }

    // Recalculate the average rating
    const totalRatings = artist.rating?.ratings.reduce(
      (acc, curr) => acc + curr.rating,
      0
    );
    artist.rating!.average = totalRatings! / artist.rating!.count;

    // Save the updated artist
    await artist.save();

    return NextResponse.json(
      { success: true, data: artist.rating },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating rating:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update rating" },
      { status: 500 }
    );
  }
}

