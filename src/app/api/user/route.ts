import UserModel, { IUser } from "@/models/User.model";
import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { uploadOnCloudinary, deleteFromCloudinary } from "@/lib/cloudinary";
import { ApiError } from "next/dist/server/api-utils";
import { isValidObjectId } from "mongoose";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { Schema } from "mongoose";

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
    const socialLink1 = data.get("socialLink1") as string;
    const socialLink2 = data.get("socialLink2") as string;
    const socialLink3 = data.get("socialLink3") as string;
    const socialLink4 = data.get("socialLink4") as string;
    const socialLink5 = data.get("socialLink5") as string;

    const errors: { [key: string]: string } = {};

    if (!username) errors.username = "Username is required";
    if (!email) errors.email = "Email is required";
    if (!password) errors.password = "Password is required";
    if (!role) errors.role = "Role is required";
    if (role === "artist") {
      if (!bio) errors.bio = "Bio is required for artists";
      if (!videoLink1) errors.videoLink1 = "Video Link 1 is required for artists";
    }

    const avatarFiles = [];
    for (let i = 1; i <= 3; i++) {
      const avatarFile = data.get(`avatar${i}`) as File;
      if (avatarFile) {
        avatarFiles.push(avatarFile);
      }
    }

    if (avatarFiles.length === 0) {
      errors.avatar = "At least one avatar image is required";
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

    let avatarImages = [];
    for (const avatarFile of avatarFiles) {
      const uploadedImage: any = await uploadOnCloudinary(avatarFile);
      if (uploadedImage) {
        avatarImages.push({
          public_id: uploadedImage.public_id,
          url: uploadedImage.url,
        });
      }
    }

    if (avatarImages.length === 0) {
      return NextResponse.json(
        { success: false, message: "Error while uploading avatar images" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser: IUser = new UserModel({
      username,
      email,
      password: hashedPassword,
      avatar: avatarImages,
      role,
      bio,
      videoLink1,
      videoLink2,
      videoLink3,
      socialLink1,
      socialLink2,
      socialLink3,
      socialLink4,
      socialLink5,
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
      socialLink1: newUser.socialLink1,
      socialLink2: newUser.socialLink2,
      socialLink3: newUser.socialLink3,
      socialLink4: newUser.socialLink4,
      socialLink5: newUser.socialLink5,
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

export async function PUT(request: Request) {
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

    const username = data.get("username") as string;
    const email = data.get("email") as string;
    const bio = data.get("bio") as string;
    const videoLink1 = data.get("videolink1") as string;
    const videoLink2 = data.get("videolink2") as string;
    const videoLink3 = data.get("videolink3") as string;
    const socialLink1 = data.get("socialLink1") as string;
    const socialLink2 = data.get("socialLink2") as string;
    const socialLink3 = data.get("socialLink3") as string;
    const socialLink4 = data.get("socialLink4") as string;
    const socialLink5 = data.get("socialLink5") as string;
    console.log(data);
    
    const avatar1 = data.get("avatar0") as File;
    const avatar2 = data.get("avatar1") as File;
    const avatar3 = data.get("avatar2") as File;

    // Update user fields
    if (username) user.username = username;
    if (email) user.email = email;
    if (bio) user.bio = bio;
    if (videoLink1) user.videoLink1 = videoLink1;
    if (videoLink2) user.videoLink2 = videoLink2;
    if (videoLink3) user.videoLink3 = videoLink3;
    if (socialLink1) user.socialLink1 = socialLink1;
    if (socialLink2) user.socialLink2 = socialLink2;
    if (socialLink3) user.socialLink3 = socialLink3;
    if (socialLink4) user.socialLink4 = socialLink4;
    if (socialLink5) user.socialLink5 = socialLink5;

    if (avatar1) {
      const uploadedImage: any = await uploadOnCloudinary(avatar1);
      
      // Update user avatar with the uploaded image
      if (uploadedImage) {
        const newAvatarImage = {
          public_id: uploadedImage.public_id,
          url: uploadedImage.url,
        };
    
        if (user.avatar && user.avatar.length > 0) {
          // Delete the old avatar from Cloudinary
          if (user.avatar[0].public_id) {
            await deleteFromCloudinary(user.avatar[0].public_id);
          }
          // Replace the first avatar
          user.avatar[0] = newAvatarImage;
        } else {
          // Add the new avatar if there are no existing avatars
          user.avatar = [newAvatarImage];
        }
      }
    } 
    
    if (avatar2) {
      const uploadedImage: any = await uploadOnCloudinary(avatar2);
      
      if (uploadedImage) {
        const newAvatarImage = {
          public_id: uploadedImage.public_id,
          url: uploadedImage.url,
        };
    
        if (user.avatar && user.avatar.length > 1) {
          // Delete the old avatar from Cloudinary
          if (user.avatar[1].public_id) {
            await deleteFromCloudinary(user.avatar[1].public_id);
          }
          // Replace the second avatar
          user.avatar[1] = newAvatarImage;
        } else if (user.avatar) {
          // Add the new avatar as the second one
          user.avatar.push(newAvatarImage);
        } 
      }
    } 
    
    if (avatar3) {
      const uploadedImage: any = await uploadOnCloudinary(avatar3);
      
      if (uploadedImage) {
        const newAvatarImage = {
          public_id: uploadedImage.public_id,
          url: uploadedImage.url,
        };
    
        if (user.avatar && user.avatar.length > 2) {
          // Delete the old avatar from Cloudinary
          if (user.avatar[2].public_id) {
            await deleteFromCloudinary(user.avatar[2].public_id);
          }
          // Replace the third avatar
          user.avatar[2] = newAvatarImage;
        } else if (user.avatar) {
          // Add the new avatar as the third one
          user.avatar.push(newAvatarImage);
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
          username: user.username,
          email: user.email,
          avatar: user.avatar,
          bio: user.bio,
          videoLink1: user.videoLink1,
          videoLink2: user.videoLink2,
          videoLink3: user.videoLink3,
          socialLink1: user.socialLink1,
          socialLink2: user.socialLink2,
          socialLink3: user.socialLink3,
          socialLink4: user.socialLink4,
          socialLink5: user.socialLink5,
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
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Not authenticated" },
        { status: 401 }
      );
    }

    const userId = session.user._id;

    const user = await UserModel.findById(userId);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Delete avatar from Cloudinary
    if (user.avatar.length > 0 && user.avatar[0].public_id) {
      await deleteFromCloudinary(user.avatar[0].public_id);
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

// Get all concerts of an artist
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
