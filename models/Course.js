import mongoose from "mongoose";

const courseSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    category: { type: String },
    trainer: { type: String },
    duration: { type: String },
    syllabus: [String],
    image: String,
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// 🆕 Virtual: chapters
courseSchema.virtual("chapters", {
  ref: "Chapter",
  localField: "_id",
  foreignField: "course",
});

export default mongoose.model("Course", courseSchema);
