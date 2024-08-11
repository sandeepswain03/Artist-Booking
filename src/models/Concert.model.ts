import { Schema, model, models, Model, Document } from "mongoose";

export interface IConcert extends Document {
  artistId: Schema.Types.ObjectId; 
  title: string;
  date: Date;
  location: string;
  description: string;
  attendees: Schema.Types.ObjectId[]; 
}

const ConcertSchema: Schema<IConcert> = new Schema({
  artistId: {
    type: Schema.Types.ObjectId,
    ref: "Artist",
    required: true,
  },
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
    minlength: [3, "Title must be at least 3 characters long"],
    maxlength: [100, "Title cannot be more than 100 characters long"],
  },
  date: {
    type: Date,
    required: [true, "Date is required"],
    validate: {
      validator: function (value: Date) {
        return value > new Date();
      },
      message: "Concert date must be in the future",
    },
  },
  location: {
    type: String,
    required: [true, "Location is required"],
    trim: true,
    minlength: [3, "Location must be at least 3 characters long"],
    maxlength: [100, "Location cannot be more than 100 characters long"],
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, "Description cannot be more than 500 characters long"],
  },
  attendees: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const ConcertModel =
  (models.Concert as Model<IConcert>) ||
  model<IConcert>("Concert", ConcertSchema);

export default ConcertModel;
