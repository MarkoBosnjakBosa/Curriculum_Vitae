import mongoose from "mongoose";

const reference = new mongoose.Schema({
  title: { type: String, required: true },
  title_de: { type: String, required: true },
  duration: { type: String, required: true },
  duration_de: { type: String, required: true },
  type: { type: String, required: true },
  logo: { name: String, mimeType: String, data: String }
});

export default mongoose.model("Reference", reference);
