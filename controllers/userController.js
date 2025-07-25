import User from "../models/User.js";
import { createClient } from "redis";
const redisClient = createClient();
redisClient.connect().catch(console.error);

export const getUser = async (req, res) => {
  const cacheKey = `user:${req.user._id}`;
  try {
    // 1. Try fetching from cache
    const cached = await redisClient.get(cacheKey);
    if (cached) {
      return res.status(200).json({
        success: true,
        message: "User fetched successfully (cache)",
        user: JSON.parse(cached),
        cached: true,
      });
    }

    // 2. Fetch from DB if not cached
    const user = await User.findById(req.user._id)
      .populate({
        path: "enrolledCourses.course",
        populate: {
          path: "chapters",
        },
      })
      .populate({
        path: "progress",
        populate: {
          path: "course",
        },
      })
      .lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await redisClient.set(cacheKey, JSON.stringify(user), { EX: 300 });

    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      user,
      cached: false,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching user",
      error: err.message,
    });
  }
};

export const logout = async (req, res) => {};
