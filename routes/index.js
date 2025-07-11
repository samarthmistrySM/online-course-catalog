import express from "express";
import userRoutes from "./userRoutes.js";
import authRoutes from "./authRoutes.js";
import courseRoutes from "./courseRoutes.js";
import progressRoutes from "./progressRoutes.js";
import chapterRoutes from "./chapterRoutes.js";

const router = express.Router();

const routes = () => {
  router.use("/auth", /* #swagger.tags = ['Auth'] */ authRoutes);
  router.use("/users", /* #swagger.tags = ['Users'] */ userRoutes);
  router.use("/courses", /* #swagger.tags = ['Courses'] */ courseRoutes);
  router.use("/chapters", /* #swagger.tags = ['Chapters'] */ chapterRoutes);
  router.use("/progress", /* #swagger.tags = ['Progress'] */ progressRoutes);
  return router;
};

export default routes;
