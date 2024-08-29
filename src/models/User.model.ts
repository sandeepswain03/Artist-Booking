import { Schema, model, models, Model, Document } from "mongoose";
//User
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  avatar: {
    public_id: string;
    url: string;
  }[];
  concerts: Schema.Types.ObjectId[];
  enquiry: Schema.Types.ObjectId[];
  role: "user" | "artist";
  videoLink1?: string;
  videoLink2?: string;
  videoLink3?: string;
  socialLink1?: string;
  socialLink2?: string;
  socialLink3?: string;
  socialLink4?: string;
  socialLink5?: string;
  bio: string;
  resetToken: string | undefined;
  resetTokenExpires: Date | undefined;
  rating?: {
    average: number;
    count: number;
    ratings: {
      userId: Schema.Types.ObjectId;
      rating: number;
    }[];
  };
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
  avatar: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
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
  socialLink1: {
    type: String,
  },
  socialLink2: {
    type: String,
  },
  socialLink3: {
    type: String,
  },
  socialLink4: {
    type: String,
  },
  socialLink5: {
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
  resetToken: {
    type: String,
    required: false,
  },
  resetTokenExpires: {
    type: Date,
    required: false,
  },
  rating: {
    average: {
      type: Number,
      default: 0,
    },
    count: {
      type: Number,
      default: 0,
    },
    ratings: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        rating: {
          type: Number,
          required: true,
          min: 1,
          max: 5,
        },
      },
    ],
  },

});

const UserModel =
  (models.User as Model<IUser>) || model<IUser>("User", UserSchema);

export default UserModel;
