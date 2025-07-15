import express from "express";
import {
  getCourses,
  getCourseById,
  enrollInCourse,
  createCourse,
  unenrollFromCourse,
  completeCourse,
  uncompleteCourse,
} from "../controllers/courseController.js";
import { admin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getCourses);
router.get("/:id", getCourseById);
router.post("/:id/enroll", protect, enrollInCourse);
router.delete("/:id/unenroll", protect, unenrollFromCourse);
router.patch("/:id/complete", protect, completeCourse);
router.patch("/:id/uncomplete", protect, uncompleteCourse);
router.post("/", protect, admin, createCourse);

export default router;
