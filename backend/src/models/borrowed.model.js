import mongoose, { Schema } from "mongoose";

const borrowedSchema = new Schema(
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
    whatsappNumber: {
      type: Schema.Types.ObjectId,
      ref: "Whatsapp",
    },
  },
  { timestamps: true }
);

export const Borrowed = mongoose.model("Borrowed", borrowedSchema);
