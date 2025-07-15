import mongoose from "mongoose";
import dotenv from "dotenv";
import Course from "./models/Course.js";
import Chapter from "./models/Chapter.js";

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

// 📝 New set of courses with chapters
const coursesData = [
  {
    name: "Advanced TypeScript",
    description:
      "Master TypeScript to write safer, scalable, and maintainable code. Perfect for JavaScript developers transitioning to TypeScript.",
    category: "Programming Languages",
    trainer: "Samarth Mistry",
    duration: "5 weeks",
    syllabus: ["Types", "Generics", "Decorators", "Type Inference"],
    image: "https://example.com/typescript-course.jpg",
    chapters: [
      {
        title: "Getting Started with TypeScript",
        description:
          "Learn the basics of TypeScript including types, interfaces, and configuration. Set up your first TypeScript project and understand the compiler.",
        tags: ["typescript", "basics", "setup"],
      },
      {
        title: "Advanced Types and Generics",
        description:
          "Dive into advanced type features like union types, intersection types, generics, and conditional types. Understand how to model complex data structures.",
        tags: ["generics", "advanced-types", "interfaces"],
      },
      {
        title: "Decorators and Metadata",
        description:
          "Explore decorators and metadata programming in TypeScript. Learn how to enhance classes and methods using decorator functions.",
        tags: ["decorators", "metadata", "oop"],
      },
    ],
  },
  {
    name: "Next.js & Modern Web",
    description:
      "Learn Next.js and build lightning-fast, SEO-friendly, fullstack applications using React and Node.js.",
    category: "Web Development",
    trainer: "Samarth Mistry",
    duration: "7 weeks",
    syllabus: ["SSR", "API Routes", "Prisma", "TailwindCSS"],
    image: "https://example.com/nextjs-course.jpg",
    chapters: [
      {
        title: "Next.js Fundamentals",
        description:
          "Understand why Next.js is the preferred React framework. Learn about file-based routing, pages, and static site generation.",
        tags: ["nextjs", "ssr", "routing"],
      },
      {
        title: "API Routes and Database Integration",
        description:
          "Create API endpoints using Next.js API routes. Connect your application to databases using Prisma ORM and learn about CRUD operations.",
        tags: ["api", "prisma", "database"],
      },
      {
        title: "Styling with TailwindCSS",
        description:
          "Integrate TailwindCSS for utility-first styling. Build responsive and clean UIs effortlessly using Next.js with Tailwind.",
        tags: ["tailwindcss", "styling", "ui"],
      },
    ],
  },
  {
    name: "Docker for Developers",
    description:
      "Learn Docker to containerize your applications and simplify development, testing, and deployment workflows.",
    category: "DevOps",
    trainer: "Samarth Mistry",
    duration: "4 weeks",
    syllabus: ["Containers", "Docker Compose", "Volumes", "Images"],
    image: "https://example.com/docker-course.jpg",
    chapters: [
      {
        title: "Introduction to Docker",
        description:
          "Understand what Docker is, why it’s used, and how containers differ from virtual machines. Set up Docker and run your first container.",
        tags: ["docker", "containers", "setup"],
      },
      {
        title: "Building and Managing Images",
        description:
          "Learn how to write Dockerfiles, build custom images, and manage image versions effectively for your projects.",
        tags: ["images", "dockerfile", "build"],
      },
      {
        title: "Docker Compose & Multi-Container Apps",
        description:
          "Discover how to orchestrate multi-container applications using Docker Compose. Set up complex environments with ease.",
        tags: ["docker-compose", "orchestration", "multi-container"],
      },
    ],
  },
];

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
