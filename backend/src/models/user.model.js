import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    whatsappNumber: {
      type: String,
      required: true,
      unique: true,
    },
    upiId: {
      type: String,
      required: true,
      unique: true,
    },
    upiNumber: {
      type: String,
      required: true,
      unique: true,
    },
    profile: {
      type: String, // cloudinary URL
      required: true,
    },
    QRCode: {
      type: String, // cloudinary URL
      required: true,
    },
    refreshToken: {
      type: String,
    },
    lendedTo: [
      {
        type: Schema.Types.ObjectId,
        ref: "Lended",
      },
    ],
    borrowedFrom: [
      {
        type: Schema.Types.ObjectId,
        ref: "Borrowed",
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      whatsappNumber: this.whatsappNumber,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);
