import { Schema, model, models, Model, Document } from "mongoose";

export interface IEnquiry extends Document {
  _id: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId; // Reference to User (who made the enquiry)
  artistId: string;
  occasion: string; 
  date: Date;
  city: string;
  budget: string;
  guestCount: number;
  name: string;
  email: string;
  contactNumber: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

const EnquirySchema: Schema<IEnquiry> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      match: [/.+@.+\..+/, "Please use a valid email"],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    guestCount: {
      type: Number,
      required: [true, "Guest count is required"],
      trim: true,
    },
    contactNumber: {
      type: String,
      required: [true, "Contact number is required"],
      trim: true,
    },
    occasion: {
      type: String,
      required: [true, "Occasion is required"],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },
    budget: {
      type: String,
      required: [true, "Budget is required"],
      trim: true,
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
    },

  },
  {
    timestamps: true,
  }
);

const EnquiryModel =
  (models.Enquiry as Model<IEnquiry>) ||
  model<IEnquiry>("Enquiry", EnquirySchema);

export default EnquiryModel;
