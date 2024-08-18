import { Schema, model, models, Model, Document } from "mongoose";
import { IConcert } from "./Concert.model";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  avatar: {
    public_id: string;
    url: string;
  };
  concerts: Schema.Types.ObjectId[]; 
  enquiry: Schema.Types.ObjectId[];   
  role: "user" | "artist";
  videoLink1?: string;
  videoLink2?: string;
  bio: string;
  videoLink3:string
}

const UserSchema: Schema<IUser> = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/.+@.+\..+/, "Please use a valid email"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    enum: ["user", "artist"],
    default: "user",
  },
  videoLink1: {
    type: String,
  },
  videoLink2: {
    type: String,
  },
  videoLink3: {
    type: String,
  },
  bio: {
    type: String,
    trim: true,
  },
  concerts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Concert",
    },
  ],
  enquiry: [
    {
      type: Schema.Types.ObjectId,
      ref: "Enquiry",
    },
  ],
});

const UserModel =
  (models.User as Model<IUser>) || model<IUser>("User", UserSchema);

export default UserModel;
