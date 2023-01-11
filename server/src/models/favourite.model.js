import mongoose, { Schema } from "mongoose";
import modelOptions from "./model.options.js";

export default mongoose.model(
  "Favourite",
  mongoose.Schema(
    {
      user: {
        type: Schema.Types.ObjectID,
        ref: "User",
        required: true,
      },
      mediaType: {
        type: String,
        enum: ["tv", "movie"],
        required: true,
      },
      mediaId: {
        type: String,
        required: true,
      },
      mediaTitle: {
        type: String,
        required: true,
      },
      mediaPoster: {
        type: String,
        required: true,
      },
      mediaRating: {
        type: Number,
        required: true,
      },
    },
    modelOptions
  )
);
