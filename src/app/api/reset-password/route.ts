import UserModel from "@/models/User.model";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { email, password } = await request.json();
    const existingUseruser = await UserModel.findOne({ email });
    if (!existingUseruser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    existingUseruser.password = hashedPassword;
    existingUseruser.resetToken = undefined;
    existingUseruser.resetTokenExpires = undefined;
    try {
      await existingUseruser.save();
      return NextResponse.json(
        { success: true, message: "Password reset successfully" },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { success: false, message: "Internal Server Error" },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
