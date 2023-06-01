import * as mongoose from "mongoose";

const contactScheme = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  isGerman: { type: Boolean, required: true },
  isAnswered: { type: Boolean, required: true },
  date: { type: Number, required: true }
});

const Contact = mongoose.model("Contact", contactScheme);

export default Contact;
