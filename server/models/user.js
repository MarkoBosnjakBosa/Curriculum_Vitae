import mongoose from "mongoose";

const user = new mongoose.Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  email: { type: String, default: "" },
  telephone: { type: String, default: "" },
  address: { type: String, default: "" },
  address_de: { type: String, default: "" },
  birthday: { type: String, default: "" },
  birthday_de: { type: String, default: "" },
  languages: { type: String, default: "" },
  languages_de: { type: String, default: "" },
  profession: { type: String, default: "" },
  profession_de: { type: String, default: "" },
  linkedIn: { type: String, default: "" },
  xing: { type: String, default: "" },
  gitHub: { type: String, default: "" },
  avatar: { name: String, mimeType: String, data: String },
  authentication: {
    enabled: { type: Boolean, default: false },
    secret: { type: String, default: "" }
  }
}, { minimize: false });

export default mongoose.model("User", user);
