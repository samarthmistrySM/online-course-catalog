import Course from "../models/Course.js";
import User from "../models/User.js";

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("chapters");
    res.status(200).json({
      success: true,
      message: "Courses fetched successfully",
      courses,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch courses",
      error: err.message,
    });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate("chapters");

    if (course) {
      res.status(200).json({
        success: true,
        message: "Course fetched successfully",
        course,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching course",
      error: err.message,
    });
  }
};

export const enrollInCourse = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user.enrolledCourses.includes(req.params.id)) {
      user.enrolledCourses.push(req.params.id);
      await user.save();
      res.status(200).json({
        success: true,
        message: "Enrolled successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Already enrolled in this course",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Enrollment failed",
      error: err.message,
    });
  }
};

export const createCourse = async (req, res) => {
  try {
    const { name, description, category, trainer, duration, syllabus, image } =
      req.body;

    if (!name || !trainer) {
      return res.status(400).json({
        success: false,
        message: "Name and trainer are required",
      });
    }

    const course = await Course.create({
      name,
      description,
      category,
      trainer,
      duration,
      syllabus,
      image,
    });

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      course,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to create course",
      error: err.message,
    });
  }
};
