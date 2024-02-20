import mongoose from "mongoose";

const skill = new mongoose.Schema({
  title: { type: String, required: true }
});

export default mongoose.model("Skill", skill);
