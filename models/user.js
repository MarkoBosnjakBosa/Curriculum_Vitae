import * as mongoose from "mongoose";

const userScheme = new mongoose.Schema({
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
  avatar: { name: String, mimeType: String, buffer: Buffer }
}, { minimize: false });

const User = mongoose.model("User", userScheme);

export default User;
