import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = user.generateAccessToken();
    console.log("access token generated");
    const refreshToken = user.generateRefreshToken();
    console.log("refresh token generated");

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      "500",
      "Error occured while generating refresh and access tokens"
    );
  }
};

// total contorllers --->
// register user
// login user
// logout user
// refreshAccesstoken
// get current user
// update account
// update media
// change current password
// get lendedTo details - agreegation pipleline
// get borrowedFrom details - agreegation pipleline

const registerUser = asyncHandler(async (req, res) => {
  // take all text
  // check if empty
  // take all images local path
  // check if empty
  // upload on cloudinary
  // check if empty
  // create a object
  // check if something wrong
  // upload and save to DB
  // find and check user from DB
  // return res

  const {
    username,
    email,
    password,
    whatsappNumber,
    upiId,
    upiNumber,
    customMessage,
  } = req.body;

  console.log(username, email, password);

  if (
    [username, email, password, whatsappNumber, upiId, upiNumber].some(
      (item) => item === ""
    )
  ) {
    throw new ApiError(
      "401",
      "Fields are mandatory please fill all details in regestration form"
    );
  }

  const profileLocalPath = req.files?.profile[0]?.path;
  const QRCodeLocalPath = req.files?.QRCode[0]?.path;

  if (!profileLocalPath && !QRCodeLocalPath) {
    throw new ApiError(
      "401",
      "Path not found while fecthing local path of images"
    );
  }

  const profile = await uploadOnCloudinary(profileLocalPath);
  const QRCode = await uploadOnCloudinary(QRCodeLocalPath);

  if (!profile && !QRCode) {
    throw new ApiError(
      "401",
      "Path not found while uploading files on cloudinary"
    );
  }

  const user = await User.create({
    username,
    email,
    password,
    whatsappNumber,
    upiId,
    upiNumber,
    profile: profile?.url,
    QRCode: QRCode?.url,
    customMessage: customMessage || "",
  });

  const createdUser = await User.findById(user?._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(
      "500",
      "user not created due to server error. please try again"
    );
  }

  return res
    .status(200)
    .json(new ApiResponse("200", createdUser, "user created successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  // take username or email
  // take password
  // find user
  // check if exists or not
  // match password
  // throw error if didn't match
  // generate token
  // set ccokies and return res

  const { username, email, password } = req.body;

  if (!(username || email)) {
    throw new ApiError("401", "username or email must required");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError("404", "user not found please enter correct details");
  }

  if (!password) {
    throw new ApiError("401", "Password is required");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError("Password is not corret please re-enter password");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user?._id
  );

  const loggedInUser = await User.findById(user.id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        "200",
        { user: loggedInUser, accessToken, refreshToken },
        "user logged in sucessfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user?._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "user logged out sucessfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  // fetch old refreshToken
  // check if empty
  // decode token
  // find user based on this decoded token
  // match each other refreshTokens
  // generate new token
  // return res

  const token = req.cookies?.refreshToken || req.body.refreshToken;

  if (!token) {
    throw new ApiError("404", "token not found");
  }

  const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

  if (!decodedToken) {
    throw new ApiError("500", "error occured while decoding the token");
  }

  const user = await User.findById(decodedToken._id).select("-password");

  if (!user) {
    throw new ApiError("401", "User not found with the mentioned token");
  }

  if (token !== user.refreshToken) {
    throw new ApiError(
      "401",
      "existed token and user token doesn't match with each other"
    );
  }

  const options = {
    httpOnly: true,
    secure: true,
  };

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { accessToken, refreshToken },
        "access token refresh successfully"
      )
    );
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "user fetched successfully"));
});

const updateAccountDetails = asyncHandler(async (req, res) => {
  // take data
  // find user
  // update account details
  // return res

  const { email, whatsappNumber, upiId, upiNumber, customMessage } = req.body;

  const user = await User.findById(req.user?._id)

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "account updated successfully"));
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getCurrentUser,
  updateAccountDetails,
};
