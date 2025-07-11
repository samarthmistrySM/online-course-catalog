import mongoose from "mongoose";
const schema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    progress: { type: Number, default: 0 },
  },
  { timestamps: true }
);
export default mongoose.model("Progress", schema);
