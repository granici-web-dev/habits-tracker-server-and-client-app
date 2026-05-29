import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({
  habit: { type: mongoose.Schema.Types.ObjectId, ref: "Habit", required: true },
  date: { type: Date, required: true },
  completed: { type: Boolean, default: false },
  notes: { type: String },
  mood: { type: String, enum: ["1", "2", "3", "4", "5"] },
});

const Progress = mongoose.model("Progress", progressSchema);

export default Progress;
