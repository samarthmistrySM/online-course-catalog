import express from "express";
import {
  getChaptersByCourse,
  createChapter,
  updateChapter,
  deleteChapter,
} from "../controllers/chapterController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/:courseId", getChaptersByCourse);

router.post("/:courseId", protect, admin, createChapter);

router.put("/:chapterId", protect, admin, updateChapter);

router.delete("/:chapterId", protect, admin, deleteChapter);

export default router;
