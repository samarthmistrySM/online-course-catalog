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

// 📝 Sample courses with detailed chapters
const coursesData = [
  {
    name: "React Mastery",
    description:
      "Learn React from basics to advanced concepts with hands-on projects and real-world examples.",
    category: "Web Development",
    trainer: "Samarth Mistry",
    duration: "6 weeks",
    syllabus: ["JSX", "Components", "Hooks", "Redux", "Testing"],
    image: "https://example.com/react-course.jpg",
    chapters: [
      {
        title: "Introduction to React",
        description:
          "This chapter introduces you to the world of React. You’ll learn why React is so popular, how it compares to other frameworks, and how its component-based architecture makes building complex UIs easier. We’ll also set up the development environment and create our first simple React app.",
        tags: ["react", "introduction", "setup"],
      },
      {
        title: "Understanding Components",
        description:
          "Dive deep into React components—both class and functional. This chapter explains props, state, and lifecycle methods in detail, showing how they enable dynamic and reusable UI building. You'll also explore component hierarchies and best practices for structuring React applications.",
        tags: ["components", "props", "state"],
      },
      {
        title: "Mastering React Hooks",
        description:
          "Learn how React Hooks revolutionized functional components. This chapter covers useState, useEffect, and custom hooks, with practical examples of managing side effects and sharing logic between components. We'll also discuss common pitfalls and how to avoid them.",
        tags: ["hooks", "useState", "useEffect"],
      },
    ],
  },
  {
    name: "Node.js Bootcamp",
    description:
      "Backend development made easy with Node.js, Express, and MongoDB. Build robust APIs and scalable server-side applications.",
    category: "Backend Development",
    trainer: "Samarth Mistry",
    duration: "8 weeks",
    syllabus: ["Express", "MongoDB", "JWT", "API Development"],
    image: "https://example.com/node-course.jpg",
    chapters: [
      {
        title: "Node.js Fundamentals",
        description:
          "Understand the core concepts of Node.js including the event loop, non-blocking I/O, and the module system. This chapter also walks you through setting up a Node.js project, working with npm packages, and understanding the REPL environment for quick experimentation.",
        tags: ["node", "event-loop", "npm"],
      },
      {
        title: "Building REST APIs with Express",
        description:
          "This chapter focuses on building robust RESTful APIs using Express. Learn about routing, middleware, request/response cycles, and error handling. You'll also implement CRUD operations and organize your application structure for scalability.",
        tags: ["express", "api", "routing"],
      },
      {
        title: "Authentication & Authorization with JWT",
        description:
          "Secure your APIs using JSON Web Tokens (JWT). You'll learn about token creation, verification, and role-based access control. This chapter includes hands-on examples of protecting routes and managing user sessions securely.",
        tags: ["auth", "jwt", "security"],
      },
    ],
  },
  {
    name: "Fullstack with MERN",
    description:
      "Combine MongoDB, Express, React, and Node.js into fullstack applications. Learn to build and deploy real-world projects end-to-end.",
    category: "Fullstack Development",
    trainer: "Samarth Mistry",
    duration: "10 weeks",
    syllabus: ["MERN", "Authentication", "Deployment"],
    image: "https://example.com/mern-course.jpg",
    chapters: [
      {
        title: "Introduction to MERN Stack",
        description:
          "Get an overview of the MERN stack and how each technology fits together. This chapter covers setting up a MERN development environment and explains the roles of MongoDB, Express, React, and Node.js in building modern web apps.",
        tags: ["mern", "overview", "setup"],
      },
      {
        title: "Frontend-Backend Integration",
        description:
          "Learn how to connect your React frontend with your Node.js backend. This chapter covers API calls using Axios, handling responses and errors, and managing application state for smooth user experiences.",
        tags: ["integration", "frontend", "backend"],
      },
      {
        title: "Deploying Fullstack Applications",
        description:
          "Deploy your fullstack applications to cloud platforms like Heroku or Vercel. You'll learn about environment variables, build processes, and setting up CI/CD pipelines for professional-grade deployments.",
        tags: ["deployment", "cloud", "ci/cd"],
      },
    ],
  },
];

async function seedDatabase() {
  try {
    // Clear old data
    await Course.deleteMany();
    await Chapter.deleteMany();
    console.log("🗑️ Old data cleared");

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
