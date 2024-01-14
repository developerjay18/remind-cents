import mongoose, { Schema } from "mongoose";

const whatsappSchema = new Schema(
  {
    number: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export const Whatsapp = mongoose.model("Whatsapp", whatsappSchema);
