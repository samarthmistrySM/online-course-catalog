import User from "../models/User.js";
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate({
        path: "enrolledCourses",
        populate: {
          path: "chapters",
        },
      })
      .populate({
        path: "progress",
        populate: {
          path: "course",
        },
      });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching user",
      error: err.message,
    });
  }
};
