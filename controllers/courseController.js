import Course from "../models/Course.js";
import User from "../models/User.js";

export const getCourses = async (req, res) => {
  try {
    const { category, search } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    const filter = {};

    if (category && category !== "All") {
      filter.category = category;
    }

    if (search && search.trim() !== "") {
      const searchRegex = new RegExp(search.trim(), "i");
      filter.$or = [
        { name: searchRegex },
        { trainer: searchRegex },
        { description: searchRegex },
        { syllabus: { $elemMatch: { $regex: searchRegex } } },
      ];
    }

    const totalCourses = await Course.countDocuments(filter);

    const courses = await Course.find(filter)
      .skip(skip)
      .limit(limit)
      .populate("chapters");

    res.status(200).json({
      success: true,
      message: "Courses fetched successfully",
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalCourses / limit),
        totalCourses,
      },
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

    const alreadyEnrolled = user.enrolledCourses.some(
      (enrolled) => enrolled.course.toString() === req.params.id
    );

    if (!alreadyEnrolled) {
      user.enrolledCourses.push({
        course: req.params.id,
        completed: false,
      });

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

export const unenrollFromCourse = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const beforeCount = user.enrolledCourses.length;

    user.enrolledCourses = user.enrolledCourses.filter(
      (enrolled) => enrolled.course.toString() !== req.params.id
    );

    if (user.enrolledCourses.length === beforeCount) {
      return res.status(400).json({
        success: false,
        message: "User is not enrolled in this course",
      });
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Unenrolled from course successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unenrollment failed",
      error: err.message,
    });
  }
};

export const completeCourse = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const enrolledCourse = user.enrolledCourses.find(
      (enrolled) => enrolled.course.toString() === req.params.id
    );

    if (!enrolledCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found in enrolled courses",
      });
    }

    if (enrolledCourse.completed) {
      return res.status(400).json({
        success: false,
        message: "Course already marked as completed",
      });
    }

    enrolledCourse.completed = true;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Course marked as completed successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to mark course as completed",
      error: err.message,
    });
  }
};

export const uncompleteCourse = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const enrolledCourse = user.enrolledCourses.find(
      (enrolled) => enrolled.course.toString() === req.params.id
    );

    if (!enrolledCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found in enrolled courses",
      });
    }

    if (!enrolledCourse.completed) {
      return res.status(400).json({
        success: false,
        message: "Course is already marked as incomplete",
      });
    }

    enrolledCourse.completed = false;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Course marked as incomplete successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to mark course as incomplete",
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
