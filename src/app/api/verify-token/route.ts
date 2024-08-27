import UserModel from "@/models/User.model";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const data = await request.json();
    const token = data.token;

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const existingUser = await UserModel.findOne({
      resetToken: hashedToken,
      resetTokenExpires: { $gt: Date.now() },
    });

    if (!existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid or expired token!",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Token verified successfully",
        user: existingUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in forget password process:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
