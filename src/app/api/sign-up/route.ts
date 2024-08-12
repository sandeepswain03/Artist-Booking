import ArtistModel from "@/models/Artist.model";
import UserModel from "@/models/User.model";
import dbConnect from "@/lib/dbConnect";
import cloudinary from "@/lib/cloudinary";
import bcrypt from "bcryptjs";
import { handleFileUpload } from "@/lib/fileUpload";

export const config = {
  api: {
    bodyParser: false, // Disable the default body parser to handle multipart/form-data
  },
};

export async function POST(request: Request) {
  await dbConnect();

  try {
    const data = await request.formData();
    const username = data.get("username");
    const email = data.get("email");
    const password = data.get("password");
    const role = data.get("role");
    const bio = data.get("bio");
    const images = data.getAll("images");
    console.log(data);
    
    //   const images = await handleFileUpload(
    //     data.getAll("images[]"),
    //     "./public/uploads"
    // );
    // console.log(data);
    
    // const singleImage = await handleFileUpload(
    //   data.getAll("images"),
    //   "./public/uploads"
    // );

    

    if (!username || !email || !password || !role) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "All required fields must be provided",
        }),
        { status: 400 }
      );
    }

    if (role !== "user" && role !== "artist") {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Invalid role specified",
        }),
        { status: 400 }
      );
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "User already exists",
        }),
        { status: 400 }
      );
    }

    // let cloudinaryResponse;
    // try {
    //   cloudinaryResponse = await cloudinary.uploader.upload(avatar, {
    //     folder: "avatars",
    //     transformation: [{ width: 500, height: 500, crop: "fill" }],
    //     resource_type: "auto",
    //   });
    // } catch (uploadError) {
    //   console.error("Error uploading avatar to Cloudinary", uploadError);
    //   return new Response(
    //     JSON.stringify({
    //       success: false,
    //       message: "Error uploading avatar",
    //     }),
    //     { status: 500 }
    //   );
    // }

    const hashedPassword = await bcrypt.hash(password as string, 10);

    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
      avatar: {
        public_id: "asdasd",
        url: "imag.saas",
      },
      role,
    });

    await newUser.save();

    if (role === "artist") {
      const newArtist = new ArtistModel({
        userId: newUser._id,
        bio,
      });
      await newArtist.save();
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "User registered successfully",
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering user", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Internal Server Error",
      }),
      { status: 500 }
    );
  }
}
