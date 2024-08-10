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
  verifyJWT,
  upload.fields([
    {
      name: "photo",
      maxCount: 1,
    },
  ]),
  createCrop
);

router.get("/", getCrops);
router.put("/:id", verifyJWT, updateCrop);
router.delete("/:id", verifyJWT, deleteCrop);

export default router;
