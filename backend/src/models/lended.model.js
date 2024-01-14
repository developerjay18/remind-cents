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
    whatsappNumber: {
      type: Schema.Types.ObjectId,
      ref: "Whatsapp",
    },
  },
  { timestamps: true }
);

export const Lended = mongoose.model("Lended", lendedSchema);
