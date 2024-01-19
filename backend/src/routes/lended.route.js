import { Router } from "express";
import verifyJwt from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
  addLendedEntry,
  deleteLendedEntry,
  getEntryOwnerDetails,
  getLendedEntryByID,
  updateLendedEntry,
} from "../controllers/lended.controller.js";

const router = Router();

router.use(verifyJwt, upload.none());

router.route("/add-entry").post(addLendedEntry);
router.route("/owner").get(getEntryOwnerDetails);
router
  .route("/:entryId")
  .patch(updateLendedEntry)
  .delete(deleteLendedEntry)
  .get(getLendedEntryByID);

export default router;
