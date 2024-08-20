import UserModel, { IUser } from "@/models/User.model";
import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { handleFileUpload } from "@/lib/fileUpload";
import { uploadOnCloudinary, deleteFromCloudinary } from "@/lib/cloudinary";
import { ApiError } from "next/dist/server/api-utils";
import { isValidObjectId } from "mongoose";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export async function POST(request: Request) {
  await dbConnect();
  try {
    // Check if the request is a multipart/form-data request
    const contentType = request.headers.get("content-type");
    if (!contentType || !(contentType.includes("multipart/form-data") || contentType.includes("application/x-www-form-urlencoded"))) {
      return NextResponse.json(
        { success: false, message: "Invalid Content-Type. Must be multipart/form-data or application/x-www-form-urlencoded" },
        { status: 400 }
      );
    }
    const data = await request.formData();
    const username = data.get("username") as string;
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    const role = data.get("role") as "user" | "artist";
    const bio = data.get("bio") as string;
    const videoLink1 = data.get("videolink1") as string;
    const videoLink2 = data.get("videolink2") as string;
    const videoLink3 = data.get("videolink3") as string;

    const errors: { [key: string]: string } = {};

    if (!username) errors.username = "Username is required";
    if (!email) errors.email = "Email is required";
    if (!password) errors.password = "Password is required";
    if (!role) errors.role = "Role is required";
    if (role === "artist") {
      if (!bio) errors.bio = "Bio is required for artists";
      if (!videoLink1) errors.videoLink1 = "Video Link 1 is required for artists";
    }
    // Video Link 2 is not required, so we don't check for it
    const avatarFile = data.get("avatar") as File | null;
    if (!avatarFile) {
      errors.avatar = "Avatar image is required";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { success: false, errors },
        { status: 400 }
      );
    }


    if (role !== "user" && role !== "artist") {
      return NextResponse.json(
        { success: false, message: "Invalid role specified" },
        { status: 400 }
      );
    }

    const existingUser = await UserModel.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User with this email or username already exists" },
        { status: 400 }
      );
    }
    const avatarLocalPath = await handleFileUpload(
      data.getAll("avatar"),
      "./public/uploads"
    );

    let avatarImage: any;
    if (Array.isArray(avatarLocalPath) && avatarLocalPath.length > 0) {
      avatarImage = await uploadOnCloudinary(avatarLocalPath[0]);
    }

    if (!avatarImage) {
      throw new ApiError(400, "Error while uploading avatar");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser: IUser = new UserModel({
      username,
      email,
      password: hashedPassword,
      avatar: {
        public_id: avatarImage?.public_id ?? '',
        url: avatarImage?.url ?? '',
      },
      role,
      bio,
      videoLink1,
      videoLink2,
      videoLink3,
    });

    await newUser.save();

    // Create a user data object without sensitive information
    const userData = {
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
      avatar: newUser.avatar,
      bio: newUser.bio,
      videoLink1: newUser.videoLink1,
      videoLink2: newUser.videoLink2,
      videoLink3: newUser.videoLink3,
    };

    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully",
        user: userData
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering user", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  await dbConnect();

  try {
    const data = await request.formData();
    const userId = data.get("userId") as string;

    // Check if userId is a valid MongoDB ObjectId
    if (!isValidObjectId(userId)) {
      return NextResponse.json(
        { success: false, message: "Invalid user ID" },
        { status: 400 }
      );
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Check if user is an artist
    if (user.role !== 'artist') {
      return NextResponse.json(
        { success: false, message: "Only artists can update bio and video links" },
        { status: 403 }
      );
    }

    const bio = data.get("bio") as string;
    const videoLink1 = data.get("videolink1") as string;
    const videoLink2 = data.get("videolink2") as string;
    const videoLink3 = data.get("videolink3") as string;

    // Update user fields
    if (bio) user.bio = bio;
    if (videoLink1) user.videoLink1 = videoLink1;
    if (videoLink2) user.videoLink2 = videoLink2;
    if (videoLink3) user.videoLink3 = videoLink3;

    // Handle avatar update
    const avatarFile = data.get("avatar") as File | null;
    if (avatarFile) {
      const avatarLocalPath = await handleFileUpload(
        data.getAll("avatar"),
        "./public/uploads"
      );

      if (Array.isArray(avatarLocalPath) && avatarLocalPath.length > 0) {
        const newAvatarImage: any = await uploadOnCloudinary(avatarLocalPath[0]);
        if (newAvatarImage) {
          // Delete old avatar from Cloudinary
          if (user.avatar.public_id) {
            await deleteFromCloudinary(user.avatar.public_id);
          }
          user.avatar = {
            public_id: newAvatarImage.public_id,
            url: newAvatarImage.url,
          };
        }
      }
    }

    await user.save();

    return NextResponse.json(
      {
        success: true,
        message: "User updated successfully",
        user: {
          _id: user._id,
          avatar: user.avatar,
          bio: user.bio,
          videoLink1: user.videoLink1,
          videoLink2: user.videoLink2,
          videoLink3: user.videoLink3,
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User ID is required" },
        { status: 400 }
      );
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Delete avatar from Cloudinary
    if (user.avatar.public_id) {
      await deleteFromCloudinary(user.avatar.public_id);
    }

    // Delete user from database
    await UserModel.findByIdAndDelete(userId);

    return NextResponse.json(
      {
        success: true,
        message: "User deleted successfully"
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting user", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Get all concerts for an artist
export async function GET(request: Request) {
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

    const user = await UserModel.findById(userId).populate("concerts");
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, concerts: user.concerts },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching concerts", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}