import ConcertModel, { IConcert } from "@/models/Concert.model";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import { handleFileUpload } from "@/lib/fileUpload";
import { uploadOnCloudinary, deleteFromCloudinary } from "@/lib/cloudinary";
import { ApiError } from "next/dist/server/api-utils";
import { isValidObjectId } from "mongoose";
import UserModel from "@/models/User.model";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const contentType = request.headers.get("content-type");
    if (!contentType || !(contentType.includes("multipart/form-data") || contentType.includes("application/x-www-form-urlencoded"))) {
      return NextResponse.json(
        { success: false, message: "Invalid Content-Type. Must be multipart/form-data or application/x-www-form-urlencoded" },
        { status: 400 }
      );
    }

    const data = await request.formData();
    const artistId = data.get("artistId") as string;
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
     if ( !artistexist) {
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
      return NextResponse.json(
        { success: false, errors },
        { status: 400 }
      );
    }

    // Upload Images
    const concertImagesLocalPaths = await handleFileUpload(
      concertImages,
      "./public/uploads"
    );

    // Uload Images to Cloudinary
    let uploadedImages = [];
    if (Array.isArray(concertImagesLocalPaths)) {
      for (const imagePath of concertImagesLocalPaths) {
        const uploadedImage:any = await uploadOnCloudinary(imagePath);
        if (uploadedImage) {
          uploadedImages.push({
            public_id: uploadedImage.public_id,
            url: uploadedImage.url,
          });
          console.log(uploadedImage);
        }
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
        concert: newConcert
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
    const { searchParams } = new URL(request.url);
    const concertId = searchParams.get('id');

    if (!isValidObjectId(concertId)) {
      return NextResponse.json(
        { success: false, message: "Invalid concert ID" },
        { status: 400 }
      );
    }

    const deletedConcert = await ConcertModel.findById(concertId);

    if (!deletedConcert) {
      return NextResponse.json(
        { success: false, message: "Concert not found" },
        { status: 404 }
      );
    }

    // Delete images from Cloudinary
    for (const image of deletedConcert.concertImages) {
      await deleteFromCloudinary(image.public_id);
    }

    // Delete the concert from the database
    await ConcertModel.findByIdAndDelete(concertId);

    // Remove concert from artist's concerts array
    await UserModel.findByIdAndUpdate(deletedConcert.artistId, {
      $pull: { concerts: concertId }
    });

    return NextResponse.json(
      {
        success: true,
        message: "Concert and associated images deleted successfully"
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
