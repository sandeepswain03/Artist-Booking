import { Schema, model, models, Model, Document } from "mongoose";
//User
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
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
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
  phoneNumber?: string;
  bio: string;
  resetToken: string | undefined;
  resetTokenExpires: Date | undefined;
  rating?: {
    average: number;
    count: number;
    ratings: {
      userId: any;
      rating: number;
    }[];
  };
  reviews?: {
    count: number;
    reviews: {
      userId: Schema.Types.ObjectId;
      review: string;
      username: string;
      avatar: string;
      createdAt: Date;
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
  verifyCode: {
    type: String,
    required: [true, 'Verify Code is required'],
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, 'Verify Code Expiry is required'],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  avatar: [
    {
      public_id: {
        type: String,
        required: function (this: IUser) {
          return this.role === "artist";
        },
      },
      url: {
        type: String,
        required: function (this: IUser) {
          return this.role === "artist";
        },
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
  reviews: {
    count: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        review: {
          type: String,
          required: true,
        },
        username: {
          type: String,
          required: false,
        },
        avatar: {
          type: String,
          required: false,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
  pincode: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
});

const UserModel =
  (models.User as Model<IUser>) || model<IUser>("User", UserSchema);

export default UserModel;
