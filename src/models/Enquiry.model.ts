import { Schema, model, models, Model, Document } from "mongoose";

export interface IEnquiry extends Document {
  userId: Schema.Types.ObjectId; // Reference to User (who made the enquiry)
  concertId: Schema.Types.ObjectId; // Reference to Concert
  message: string;
  status: "pending" | "answered" | "closed";
  createdAt: Date;
  updatedAt: Date;
}

const EnquirySchema: Schema<IEnquiry> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    concertId: {
      type: Schema.Types.ObjectId,
      ref: "Concert",
      required: true,
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "answered", "closed"],
      default: "pending",
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
