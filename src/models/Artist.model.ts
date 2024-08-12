import { Schema, model, models, Model, Document } from "mongoose";

export interface IArtist extends Document {
  userId: Schema.Types.ObjectId;
  bio: string;
  concerts: Schema.Types.ObjectId[]; // List of Concert IDs
}

const ArtistSchema: Schema<IArtist> = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
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
});

const ArtistModel =
  (models.Artist as Model<IArtist>) || model<IArtist>("Artist", ArtistSchema);

export default ArtistModel;
