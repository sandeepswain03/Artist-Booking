import UserModel, { IUser } from "@/models/User.model";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
  await dbConnect();
  try {
    // Check if the request is a multipart/form-data request
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
    const email = data.get("email") as string;

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required",
        },
        { status: 400 }
      );
    }

    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Email does not exist!",
        },
        { status: 400 }
      );
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const passwordResetExpires = Date.now() + 3600000; // 1 hour from now
    const username = existingUser.username;
    existingUser.resetToken = passwordResetToken;
    existingUser.resetTokenExpires = new Date(passwordResetExpires);
    await existingUser.save();

    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password/${resetToken}`;

    try {
      await sendVerificationEmail(email, username, resetUrl);
      return NextResponse.json(
        {
          success: true,
          message: "Password reset email sent successfully",
        },
        { status: 200 }
      );
    } catch (emailError) {
      console.error("Error sending verification email:", emailError);
      // Undefine the tokens if email fails to send
      existingUser.resetToken = undefined;
      existingUser.resetTokenExpires = undefined;
      await existingUser.save();
      return NextResponse.json(
        { success: false, message: "Failed to send verification email" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in forget password process:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
