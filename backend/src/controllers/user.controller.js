import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

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
// update profile && update QRCode
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

  if (
    [email, whatsappNumber, upiId, upiNumber, customMessage].some(
      (item) => item === ""
    )
  ) {
    throw new ApiError("404", "All fields are manadtory please fill all");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        email,
        whatsappNumber,
        upiId,
        upiNumber,
        customMessage,
      },
    },
    {
      new: true,
    }
  ).select("-password");

  if (!user) {
    throw new ApiError(
      "404",
      "Error occured while fetching user at updation time"
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "account updated successfully"));
});

const updateProfile = asyncHandler(async (req, res) => {
  // take local file
  // check if empty
  // upload on cloudinary
  // check if uploaded
  // return res

  const profileLocalPath = req.file?.path;

  if (!profileLocalPath) {
    throw new ApiError("404", "profile local path not found");
  }

  const profile = await uploadOnCloudinary(profileLocalPath);

  if (!profile?.url) {
    throw new ApiError(
      "500",
      "Error occured while uploading pic on cloudinary"
    );
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        profile: profile.url,
      },
    },
    { new: true }
  ).select("-password");

  if (!user) {
    throw new ApiError("500", "error occured while updating image on database");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "profile updated sucessfully"));
});

const updateQRCode = asyncHandler(async (req, res) => {
  // take local file
  // check if empty
  // upload on cloudinary
  // check if uploaded
  // return res

  const QRCodeLocalPath = req.file?.path;

  if (!QRCodeLocalPath) {
    throw new ApiError("404", "profile local path not found");
  }

  const QRCode = await uploadOnCloudinary(QRCodeLocalPath);

  if (!QRCode?.url) {
    throw new ApiError(
      "500",
      "Error occured while uploading pic on cloudinary"
    );
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        QRCode: QRCode.url,
      },
    },
    { new: true }
  ).select("-password");

  if (!user) {
    throw new ApiError("500", "error occured while updating image on database");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "profile updated sucessfully"));
});

const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!newPassword) {
    throw new ApiError("401", "new and old both password are mandatory");
  }

  const user = await User.findById(req.user?._id);

  const isPasswordValid = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordValid) {
    throw new ApiError("401", "Password doen't match with each other");
  }

  user.password = newPassword;
  user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "password changed successfully"));
});

const getLendedData = asyncHandler(async (req, res) => {
  const user = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    {
      $lookup: {
        from: "lendeds",
        localField: "_id",
        foreignField: "owner",
        as: "lendedTo",
        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "owner",
              foreignField: "_id",
              as: "owner",
              pipeline: [
                {
                  $project: {
                    _id: 1,
                    username: 1,
                    whatsappNumber: 1,
                  },
                },
              ],
            },
          },
          {
            $addFields: {
              owner: {
                $first: "$owner",
              },
            },
          },
        ],
      },
    },
  ]);

  return res
    .status(200)
    .json(
      new ApiResponse(200, user[0].lendedTo, "Lended data fetched successfully")
    );
});

const getBorrowedData = asyncHandler(async (req, res) => {
  const user = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    {
      $lookup: {
        from: "borroweds",
        localField: "_id",
        foreignField: "owner",
        as: "borrowedFrom",
        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "owner",
              foreignField: "_id",
              as: "owner",
              pipeline: [
                {
                  $project: {
                    _id: 1,
                    username: 1,
                    whatsappNumber: 1,
                  },
                },
              ],
            },
          },
          {
            $addFields: {
              owner: {
                $first: "$owner",
              },
            },
          },
        ],
      },
    },
  ]);


  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        user[0].borrowedFrom,
        "Borrowed from data fetched successfully"
      )
    );
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getCurrentUser,
  updateAccountDetails,
  updateProfile,
  updateQRCode,
  changePassword,
  getLendedData,
  getBorrowedData,
};
