import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

const registerUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(
      new ApiResponse(
        "200",
        "data field is empty",
        "user registered successfully"
      )
    );
});

export { registerUser };
