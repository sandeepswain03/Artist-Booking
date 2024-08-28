import ConcertModel, { IConcert } from "@/models/Concert.model";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import { uploadOnCloudinary, deleteFromCloudinary } from "@/lib/cloudinary";
import { ApiError } from "next/dist/server/api-utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { isValidObjectId } from "mongoose";
import UserModel from "@/models/User.model";

export async function POST(request: Request) {
  await dbConnect();

  try {
    // Get the authenticated user's session
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const artistId = session.user._id; // Use the logged-in user's ID as the artistId

    const contentType = request.headers.get("content-type");
    if (
      !contentType ||
      !(
        contentType.includes("multipart/form-data") ||
        contentType.includes("application/x-www-form-urlencoded")
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid Content-Type. Must be multipart/form-data or application/x-www-form-urlencoded",
        },
        { status: 400 }
      );
    }

    const data = await request.formData();
    // const artistId = data.get("artistId") as string;
    const title = data.get("title") as string;
    const date = data.get("date") as string;
    const time = data.get("time") as string;
    const location = data.get("location") as string;
    const city = data.get("city") as string;
    const description = data.get("description") as string;
    const price = parseFloat(data.get("price") as string);
    const capacity = parseInt(data.get("capacity") as string);
    const genre = data.get("genre") as string;

    const errors: { [key: string]: string } = {};

    if (!artistId) errors.artistId = "Artist ID is required";

    // Check if userId is a valid MongoDB ObjectId
    if (!isValidObjectId(artistId)) {
      return NextResponse.json(
        { success: false, message: "Invalid user ID" },
        { status: 400 }
      );
    }

    const artistexist = await UserModel.findById(artistId);

    // Check if userId is a valid MongoDB ObjectId
    if (!artistexist) {
      return NextResponse.json(
        { success: false, message: "Invalid user ID" },
        { status: 400 }
      );
    }

    // Validation
    if (!title) errors.title = "Title is required";
    if (!date) errors.date = "Date is required";
    if (!time) errors.time = "Time is required";
    if (!location) errors.location = "Location is required";
    if (!city) errors.city = "City is required";
    if (!price) errors.price = "Price is required";
    if (!capacity) errors.capacity = "Capacity is required";
    if (!genre) errors.genre = "Genre is required";

    // Get Images
    const concertImages = data.getAll("concertImages") as File[];
    if (!concertImages || concertImages.length === 0) {
      errors.concertImages = "At least one concert image is required";
    }

    //Check images exist
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    // Upload Images to Cloudinary directly
    let uploadedImages = [];
    for (const concertImage of concertImages) {
      const uploadedImage: any = await uploadOnCloudinary(concertImage);
      if (uploadedImage) {
        uploadedImages.push({
          public_id: uploadedImage.public_id,
          url: uploadedImage.url,
        });
      }
    }

    // Check if images uploaded
    if (uploadedImages.length === 0) {
      throw new ApiError(400, "Error while uploading concert images");
    }

    // Create Concert
    const newConcert: IConcert = new ConcertModel({
      artistId,
      title,
      date: new Date(date),
      time,
      location,
      city,
      description,
      price,
      capacity,
      genre,
      concertImages: uploadedImages,
    });

    // Save Concert
    await newConcert.save();

    // Add Concert to Artist
    artistexist.concerts.push(newConcert._id);
    artistexist.save();

    return NextResponse.json(
      {
        success: true,
        message: "Concert created successfully",
        concert: newConcert,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating concert", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Delete a concert and its associated images from the database and Cloudinary
export async function DELETE(request: Request) {
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
    const { searchParams } = new URL(request.url);
    const concertId = searchParams.get("id");

    if (!isValidObjectId(concertId)) {
      return NextResponse.json(
        { success: false, message: "Invalid concert ID" },
        { status: 400 }
      );
    }

    const concert = await ConcertModel.findById(concertId);

    if (!concert) {
      return NextResponse.json(
        { success: false, message: "Concert not found" },
        { status: 404 }
      );
    }

    if (concert.artistId.toString() !== userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized to delete this concert" },
        { status: 403 }
      );
    }

    // Proceed with deleting images from Cloudinary and the concert
    for (const image of concert.concertImages) {
      await deleteFromCloudinary(image.public_id);
    }

    await ConcertModel.findByIdAndDelete(concertId);

    await UserModel.findByIdAndUpdate(userId, {
      $pull: { concerts: concertId },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Concert deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting concert", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  await dbConnect();

  try {
    const concerts = await ConcertModel.find({});
    return NextResponse.json(
      { success: true, data: concerts },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch concerts" },
      { status: 500 }
    );
  }
}
