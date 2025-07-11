import Progress from "../models/Progress.js";
import { validationResult } from "express-validator";

export const getProgress = async (req, res, next) => {
  try {
    const data = await Progress.find({ user: req.user._id }).populate("course");
    res.status(200).json({
      success: true,
      message: "Progress data fetched successfully",
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch progress data",
      error: err.message,
    });
  }
};

export const updateProgress = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: errors.array(),
      });
    }

    const { course, progress } = req.body;
    let record = await Progress.findOne({ user: req.user._id, course });
    if (record) {
      record.progress = progress;
      await record.save();
      res.status(200).json({
        success: true,
        message: "Progress updated successfully",
        data: record,
      });
    } else {
      record = await Progress.create({ user: req.user._id, course, progress });
      res.status(201).json({
        success: true,
        message: "Progress created successfully",
        data: record,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update progress",
      error: err.message,
    });
  }
};
