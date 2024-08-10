import mongoose from "mongoose";
import { cropCategory } from "../constants.js";

const cropSchema = new mongoose.Schema(
  {
    category: {
      enum: cropCategory,
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    stockQuantity: {
      type: String,
      required: true,
    },
    producer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

export const crop = mongoose.model("crop", cropSchema);
