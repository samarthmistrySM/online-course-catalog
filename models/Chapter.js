import mongoose from "mongoose";

const chapterSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    tags: [String],
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Chapter", chapterSchema);
