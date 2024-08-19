import { Schema, model, models, Model, Document } from "mongoose";

export interface IConcert extends Document {
  _id: Schema.Types.ObjectId;
  artistId: Schema.Types.ObjectId;
  title: string;
  date: Date;
  time: string;
  location: string;
  city: string;
  description: string; // Single User ID
  attendees: Schema.Types.ObjectId[]; // List of User IDs
  price: number;
  capacity: number;
  genre: string;
  concertImages: {
    public_id: string;
    url: string;
  }[];
}

const ConcertSchema: Schema<IConcert> = new Schema({
  artistId: {
    type: Schema.Types.ObjectId,
    ref: "User", // Referencing the User model as artists are users too
    required: true,
  },
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true
  },
  concertImages: [{
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  }],
  date: {
    type: Date,
    required: [true, "Date is required"],
  },
  time: {
    type: String,
    required: [true, "Time is required"],
  },
  location: {
    type: String,
    required: [true, "Location is required"],
    trim: true,
  },
  city: {
    type: String,
    required: [true, "City is required"],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  attendees: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: 0,
  },
  capacity: {
    type: Number,
    required: [true, "Capacity is required"],
    min: 1,
  },
  genre: {
    type: String,
    required: [true, "Genre is required"],
    trim: true,
  },
});

const ConcertModel =
  (models.Concert as Model<IConcert>) ||
  model<IConcert>("Concert", ConcertSchema);

export default ConcertModel;
