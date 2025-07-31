import mongoose from "mongoose";
import dotenv from "dotenv";
import Course from "./models/Course.js";
import Chapter from "./models/Chapter.js";
import coursesData from "./coursesData.js";
// Load .env variables
dotenv.config();

// 🛠 MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected for seeding"))
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  });

async function seedDatabase() {
  try {
    // Clear old data
    // await Course.deleteMany();
    // await Chapter.deleteMany();
    // console.log("🗑️ Old data cleared");

    for (const courseData of coursesData) {
      // Create course
      const { chapters, ...courseFields } = courseData;
      const course = await Course.create(courseFields);

      // Create chapters for this course
      const chapterDocs = chapters.map((ch) => ({
        ...ch,
        course: course._id,
      }));
      await Chapter.insertMany(chapterDocs);

      console.log(`✅ Course "${course.name}" added with chapters`);
    }

    console.log("🎉 Database seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
}

seedDatabase();
