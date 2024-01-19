import { Router } from "express";
import verifyJwt from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
  addBorrowedEntry,
  deleteBorrowedEntry,
  getBorrowedEntryByID,
  getEntryOwnerDetails,
  updateBorrowedEntry,
} from "../controllers/borrowed.controller.js";

const router = Router();

router.use(verifyJwt, upload.none());

router.route("/add-entry").post(addBorrowedEntry);
router.route("/owner").get(getEntryOwnerDetails);
router
  .route("/:entryId")
  .patch(updateBorrowedEntry)
  .delete(deleteBorrowedEntry)
  .get(getBorrowedEntryByID);

export default router;
