import { Router } from "express";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  updateAccountDetails,
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
router.route("/current-user").get(verifyJwt, getCurrentUser);
router.route("/update-account").post(verifyJwt, updateAccountDetails);

export default router;
