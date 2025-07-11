import Chapter from "../models/Chapter.js";
import Course from "../models/Course.js";

// 🔥 Get all chapters for a course
export const getChaptersByCourse = async (req, res) => {
  try {
    const chapters = await Chapter.find({ course: req.params.courseId });
    res.status(200).json({
      success: true,
      message: "Chapters fetched successfully",
      data: chapters,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch chapters",
      error: err.message,
    });
  }
};

// ✨ Create a new chapter (admin only)
export const createChapter = async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    const courseId = req.params.courseId;

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const chapter = await Chapter.create({
      title,
      description,
      tags,
      course: courseId,
    });

    res.status(201).json({
      success: true,
      message: "Chapter created successfully",
      data: chapter,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to create chapter",
      error: err.message,
    });
  }
};

// 📝 Update a chapter
export const updateChapter = async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    const chapter = await Chapter.findByIdAndUpdate(
      req.params.chapterId,
      { title, description, tags },
      { new: true }
    );

    if (!chapter) {
      return res.status(404).json({
        success: false,
        message: "Chapter not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Chapter updated successfully",
      data: chapter,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update chapter",
      error: err.message,
    });
  }
};

// ❌ Delete a chapter
export const deleteChapter = async (req, res) => {
  try {
    const chapter = await Chapter.findByIdAndDelete(req.params.chapterId);
    if (!chapter) {
      return res.status(404).json({
        success: false,
        message: "Chapter not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Chapter deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete chapter",
      error: err.message,
    });
  }
};
