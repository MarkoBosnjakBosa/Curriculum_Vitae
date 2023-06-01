import * as mongoose from "mongoose";

const skillScheme = new mongoose.Schema({
  title: { type: String, required: true }
});

const Skill = mongoose.model("Skill", skillScheme);

export default Skill;
