import { Schema, model, models, Model, Document } from "mongoose";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import { ApiError } from "next/dist/server/api-utils";
import { isValidObjectId } from "mongoose";
import UserModel from "@/models/User.model";
import EnquiryModel, { IEnquiry } from "@/models/Enquiry.model";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const contentType = request.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return NextResponse.json(
        { success: false, message: "Invalid Content-Type. Must be application/json" },
        { status: 400 }
      );
    }

    const data = await request.json();
    const userId = data.userId as string;
    const occasion = data.occasion as string;
    const date = data.date as string;
    const city = data.city as string;
    const budget = data.budget as string;
    const guestCount = parseInt(data.guestCount as string);
    const name = data.name as string;
    const email = data.email as string;
    const contactNumber = data.contactNumber as string;
    const message = data.message as string;

    const errors: { [key: string]: string } = {};

    if (!userId) errors.userId = "User ID is required";

     // Check if userId is a valid MongoDB ObjectId
     if (!isValidObjectId(userId)) {
        return NextResponse.json(
          { success: false, message: "Invalid user ID" },
          { status: 400 }
        );
      }

      const userexist = await UserModel.findById(userId);


     // Check if userId is a valid MongoDB ObjectId
     if ( !userexist) {
        return NextResponse.json(
          { success: false, message: "Invalid user ID" },
          { status: 400 }
        );
      }
           
    // Validation  
    if (!occasion) errors.occasion = "Occasion is required";
    if (!date) errors.date = "Date is required";
    if (!city) errors.city = "City is required";
    if (!budget) errors.budget = "Budget is required";
    if (!name) errors.name = "Name is required";
    if (!email) errors.email = "Email is required";
    if (!contactNumber) errors.contactNumber = "Contact number is required";
    if (!message) errors.message = "Message is required";

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { success: false, errors },
        { status: 400 }
      );
    }

    // Create Enquiry
    const newEnquiry: IEnquiry = new EnquiryModel({
      userId,
      occasion,
      date: new Date(date),
      city,
      budget,
      guestCount,
      name,
      email,
      contactNumber,
      message,
      status: "pending",
    });

    // Save Enquiry
    await newEnquiry.save();
    
    // Add Enquiry to User
    userexist.enquiry.push(newEnquiry._id);
    userexist.save();

    return NextResponse.json(
      {
        success: true,
        message: "Enquiry created successfully",
        enquiry: newEnquiry
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating enquiry", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Delete an enquiry from the database
export async function DELETE(request: Request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const enquiryId = searchParams.get('id');

    if (!isValidObjectId(enquiryId)) {
      return NextResponse.json(
        { success: false, message: "Invalid enquiry ID" },
        { status: 400 }
      );
    }

    const deletedEnquiry = await EnquiryModel.findById(enquiryId);

    if (!deletedEnquiry) {
      return NextResponse.json(
        { success: false, message: "Enquiry not found" },
        { status: 404 }
      );
    }

    // Delete the enquiry from the database
    await EnquiryModel.findByIdAndDelete(enquiryId);

    // Remove enquiry from user's enquiry array
    await UserModel.findByIdAndUpdate(deletedEnquiry.userId, {
      $pull: { enquiry: enquiryId }
    });

    return NextResponse.json(
      {
        success: true,
        message: "Enquiry deleted successfully"
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting enquiry", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
