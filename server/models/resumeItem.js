import mongoose from "mongoose";

const resumeItem = new mongoose.Schema({
  title: { type: String, required: true },
  title_de: { type: String, required: true },
  workPlace: { type: String, required: true },
  workPlace_de: { type: String, required: true },
  duration: { type: String, required: true },
  duration_de: { type: String, required: true },
  description: { type: String },
  description_de: { type: String },
  type: { type: String, required: true }
});

export default mongoose.model("ResumeItem", resumeItem);
