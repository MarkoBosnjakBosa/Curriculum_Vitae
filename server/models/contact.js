import mongoose from "mongoose";

const contact = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  isGerman: { type: Boolean, required: true },
  isAnswered: { type: Boolean, required: true },
  date: { type: Number, required: true }
});

export default mongoose.model("Contact", contact);
