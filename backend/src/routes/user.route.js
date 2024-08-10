import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  changePassword,
  changeDisplayName,
  changeAvatar,
  getProfile,
  forgotPassword,
  resetPassword,
} from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.post(
  "/register",
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
  ]),
  registerUser
);



router.post("/login", loginUser);

router.post("/logout",logoutUser);

router.post("/forgotpassword", forgotPassword);

router.put("/resetpassword/:token", resetPassword);

router.put("/changepassword", verifyJWT, changePassword);

router.put("/changedisplayname", verifyJWT, changeDisplayName);

router.put(
  "/changeavatar",
  verifyJWT,
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
  ]),
  changeAvatar
);

router.get("/profile", verifyJWT, getProfile);

export default router;
