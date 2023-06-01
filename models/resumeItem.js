import * as mongoose from "mongoose";

const resumeItemScheme = new mongoose.Schema({
  title: { type: String, required: true },
  title_de: { type: String, required: true },
  workPlace: { type: String, required: true },
  workPlace_de: { type: String, required: true },
  duration: { type: String, required: true },
  duration_de: { type: String, required: true },
  description: { type: String, required: true },
  description_de: { type: String, required: true },
  type: { type: String, required: true }
});

const ResumeItem = mongoose.model("ResumeItem", resumeItemScheme);

export default ResumeItem;
