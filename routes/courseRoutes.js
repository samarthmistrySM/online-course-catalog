import express from "express";
import {
  getCourses,
  getCourseById,
  enrollInCourse,
  createCourse,
} from "../controllers/courseController.js";
import { admin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getCourses);
router.get("/:id", getCourseById);
router.post("/:id/enroll", protect, enrollInCourse);
router.post("/", protect, admin, createCourse);

export default router;
