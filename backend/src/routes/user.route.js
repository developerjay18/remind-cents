import { Router } from "express";
import {
  changePassword,
  getBorrowedData,
  getCurrentUser,
  getLendedData,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  updateAccountDetails,
  updateProfile,
  updateQRCode,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import verifyJwt from "../middlewares/auth.middleware.js";

const router = Router();

// unsecured routes
router.route("/register").post(
  upload.fields([
    {
      name: "profile",
      maxCount: 1,
    },
    {
      name: "QRCode",
      maxCount: 1,
    },
  ]),
  registerUser
);
router.route("/login").post(loginUser);

// secured routes
router.route("/logout").post(verifyJwt, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/current-user").get(verifyJwt, getCurrentUser); // for profile
router.route("/update-account").patch(verifyJwt, updateAccountDetails);
router
  .route("/profile")
  .patch(verifyJwt, upload.single("profile"), updateProfile);
router.route("/QRCode").patch(verifyJwt, upload.single("QRCode"), updateQRCode);
router.route("/change-password").post(verifyJwt, changePassword);
router.route("/lended-data").get(verifyJwt, getLendedData);
router.route("/borrowed-data").get(verifyJwt, getBorrowedData);

export default router;
