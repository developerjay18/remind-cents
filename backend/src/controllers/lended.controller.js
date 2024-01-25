import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Lended } from "../models/lended.model.js";
import { isValidObjectId } from "mongoose";
import sendWhatsappMessage from "../utils/sendMessage.js";
import cron from "node-cron";
import { User } from "../models/user.model.js";
import {
  generateLendedMsgClient,
  generateLendedMsgUser,
} from "../utils/MessageFormat.js";

const addLendedEntry = asyncHandler(async (req, res) => {
  // take data
  // check if empty
  // create entry
  // return res

  const { name, amount, duration, whatsappNumber } = req.body;
  const user = req.user;
  if (
    [name, amount, duration, whatsappNumber].some((item) => item.trim() === "")
  ) {
    throw new ApiError("401", "All fields are required to add entry");
  }

  const lendedObj = await Lended.create({
    name,
    amount,
    duration,
    whatsappNumber,
    owner: user?._id,
  });

  if (!lendedObj) {
    throw new ApiError("500", "Lended data is not creating. please try again");
  }

  const uploadedData = await Lended.findById(lendedObj?._id);

  if (!uploadedData) {
    throw new ApiError("500", "Entry not created in DB. please try again");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, uploadedData, "Entry added sucessfully"));
});

const updateLendedEntry = asyncHandler(async (req, res) => {
  // take data
  // check if empty
  // validate param ID
  // check owners
  // update entry
  // save
  // return res

  const { name, amount, duration, whatsappNumber } = req.body;
  const { entryId } = req.params;

  if (
    [name, amount, duration, whatsappNumber].some((item) => item.trim() === "")
  ) {
    throw new ApiError("401", "All fields are required for updation");
  }

  if (!isValidObjectId(entryId)) {
    throw new ApiError("401", "Invalid object ID");
  }

  const lendedEntry = await Lended.findById(entryId);

  if (!lendedEntry) {
    throw new ApiError("404", "Entry not found matched to this ID");
  }

  if (lendedEntry.owner.toString() !== req.user?._id.toString()) {
    throw new ApiError(
      "401",
      "Id and actual owners are not same. you can uodate this entry"
    );
  }

  const updatedEntry = await Lended.findByIdAndUpdate(
    entryId,
    {
      $set: {
        name,
        amount,
        duration,
        whatsappNumber,
      },
    },
    {
      new: true,
    }
  );

  if (!updatedEntry) {
    throw new ApiError("500", "entry not updated please try again");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedEntry, "Lended entry updated successfully")
    );
});

const deleteLendedEntry = asyncHandler(async (req, res) => {
  // take id
  // validate
  // owners validate
  // delte id
  // return res

  const { entryId } = req.params;

  if (!isValidObjectId(entryId)) {
    throw new ApiError("401", "Invalid entry ID");
  }

  const lendedEntry = await Lended.findById(entryId);

  if (!lendedEntry) {
    throw new ApiError("401", "This ID doesn't match any entry");
  }

  if (lendedEntry.owner?.toString() !== req.user?._id.toString()) {
    throw new ApiError(
      "401",
      "Owners are not same. you can't delete this entry"
    );
  }

  const deletedEntry = await Lended.findByIdAndDelete(lendedEntry._id);

  if (!deletedEntry) {
    throw new ApiError(
      "500",
      "Failed to delete this entry please try again later"
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Lended entry deleted sucessfully"));
});

const getLendedEntryByID = asyncHandler(async (req, res) => {
  const { entryId } = req.params;

  if (!isValidObjectId(entryId)) {
    throw new ApiError("401", "Invalid entry ID");
  }

  const lendedEntry = await Lended.findById(entryId);

  if (!lendedEntry) {
    throw new ApiError("404", "This ID doesn't matches with any entry");
  }

  if (lendedEntry.owner?.toString() !== req.user?._id.toString()) {
    throw new ApiError("401", "you are not the actual owner of this entry");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, lendedEntry, "Lended entry fetched sucessfully")
    );
});

const getEntryOwnerDetails = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "Entry owner fetched successfully"));
});

// main logic handling function
async function sendReminderMessages() {
  try {
    const expiredEntries = await Lended.find({
      $expr: {
        $gte: [
          { $subtract: [new Date(), "$startDate"] },
          { $multiply: [{ $toDecimal: "$duration" }, 24 * 60 * 60 * 1000] },
        ],
      },
    });

    expiredEntries.forEach(async (entry) => {
      const user = await User.findById(entry?.owner).select("-password");

      if (entry.whatsappNumber) {
        const message = generateLendedMsgClient(user, entry);
        const message2 = generateLendedMsgUser(user, entry);
        sendWhatsappMessage(`+91${entry.whatsappNumber}`, message);
        sendWhatsappMessage(`+91${user.whatsappNumber}`, message2);
      }
    });
  } catch (error) {
    console.error("Error sending reminders:", error);
  }
}

cron.schedule("04 15 * * *", () => {
  sendReminderMessages();
});

export {
  addLendedEntry,
  updateLendedEntry,
  deleteLendedEntry,
  getLendedEntryByID,
  getEntryOwnerDetails,
};
