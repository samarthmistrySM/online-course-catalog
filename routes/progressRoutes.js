import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  getProgress,
  updateProgress,
} from "../controllers/progressController.js";
import { body } from "express-validator";

const router = express.Router();

router.use(protect);
router.get("/", getProgress);
router.post(
  "/",
  [body("course").notEmpty(), body("progress").isInt({ min: 0, max: 100 })],
  updateProgress
);

export default router;
