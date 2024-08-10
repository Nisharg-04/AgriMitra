import { Router } from "express";
import {
  createCrop,
  deleteCrop,
  getCrops,
  updateCrop,
} from "../controllers/crop.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();
router.post(
  "/createCrop",
  upload.fields([
    {
      name: "photo",
      maxCount: 1,
    },
  ]),
  verifyJWT,
  createCrop
);

router.get("/getCrops", getCrops);
router.put("/updateCrop/:id", verifyJWT, updateCrop);
router.delete("/deleteCrop/:id", verifyJWT, deleteCrop);

export default router;
