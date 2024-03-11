import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

const verifyJwt = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError("404", "Token not found while verifying jwt");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!decodedToken) {
      throw new ApiError("401", "token faces error while decoding");
    }

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError("404", "user not matched with mentioned token");
    }

    req.user = user;

    next();
  } catch (error) {
    throw new ApiError("Error while verifying JWT", error);
  }
});

export default verifyJwt;
