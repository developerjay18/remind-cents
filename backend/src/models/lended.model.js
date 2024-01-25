import mongoose, { Schema } from "mongoose";

const lendedSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date, // Store the start date as a Date type
      default: Date.now,
    },
    whatsappNumber: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Lended = mongoose.model("Lended", lendedSchema);
