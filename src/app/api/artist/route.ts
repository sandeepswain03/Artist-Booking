import UserModel from "@/models/User.model";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import mongoose, { Schema } from "mongoose";

export async function GET(request: Request) {
  await dbConnect();
  try {
    const artists = await UserModel.find({ role: "artist" });

    return NextResponse.json({ success: true, data: artists }, { status: 200 });
  } catch (error) {
    console.error("Error fetching artists:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch artists" },
      { status: 500 }
    );
  }
}

// error in user validation
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
    console.log(artistId, userId, rating);

    if (!artistId || !userId || rating === undefined) {
      return NextResponse.json(
        { success: false, message: "Invalid input data" },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { success: false, message: "Invalid user ID format" },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(artistId)) {
      return NextResponse.json(
        { success: false, message: "Invalid artist ID format" },
        { status: 400 }
      );
    }

    const validUserId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(userId);
    const validArtistId = new mongoose.Types.ObjectId(artistId);

    // Check if the artist (user with role "artist") exists
    const artist = await UserModel.findOne({
      _id: validArtistId,
      role: "artist",
    });

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
        userId: validUserId,
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

export async function POST(request: Request) {
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
    const { artistId, review } = await request.json();

    if (!artistId || !userId || !review) {
      return NextResponse.json(
        { success: false, message: "Invalid input data" },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(artistId)) {
      return NextResponse.json(
        { success: false, message: "Invalid ID format" },
        { status: 400 }
      );
    }

    const validUserId = new mongoose.Types.ObjectId(userId);
    const validArtistId = new mongoose.Types.ObjectId(artistId);

    const artist = await UserModel.findOne({
      _id: validArtistId,
      role: "artist"
    });

    if (!artist) {
      return NextResponse.json(
        { success: false, message: "Artist not found" },
        { status: 404 }
      );
    }

    const user = await UserModel.findById(validUserId);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    if (!artist.reviews) {
      artist.reviews = { count: 0, reviews: [] };
    }

    // Check if the user has already given a review
    const existingReview = artist.reviews.reviews.find(
      (r) => r.userId.toString() === userId
    );

    if (existingReview) {
      return NextResponse.json(
        { success: false, message: "You have already submitted a review for this artist" },
        { status: 400 }
      );
    }

    artist.reviews.reviews.push({
      userId: validUserId as unknown as Schema.Types.ObjectId,
      username: user.username,
      avatar: user.avatar[0]?.url || "",
      review,
      createdAt: new Date()
    })
    artist.reviews.count += 1;
    console.log(artist.reviews);
    await artist.save();

    return NextResponse.json(
      { success: true, message: "Review submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create review" },
      { status: 500 }
    );
  }
}
