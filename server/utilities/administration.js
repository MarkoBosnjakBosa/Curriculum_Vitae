import bcryptjs from "bcryptjs";
import fs from "fs";
import path from "path";
import User from "../models/user.js";

export const createAdministrator = async () => {
  const password = process.env.ADMINISTRATOR_DEFAULT_PASSWORD;
  const salt = bcryptjs.genSaltSync(Number(process.env.BCRYPTJS_COST_FACTOR));
  const hashedPassword = bcryptjs.hashSync(password, salt);
  const username = process.env.ADMINISTRATOR_DEFAULT_USERNAME;
  const query = { username };
  const data = fs.readFileSync(path.resolve("./utilities/assets/avatarImage.jpg"), { encoding: "base64" });
  const avatar = { name: "avatarImage.jpg", mimeType: "image/jpg", data: `data:image/jpg;base64,${data}` };
  const update = { $setOnInsert: { username, password: hashedPassword, firstName: "", lastName: "", email: "", telephone: "", address: "", address_de: "", birthday: "", birthday_de: "", languages: "", languages_de: "", profession: "", profession_de: "", linkedIn: "", xing: "", gitHub: "", avatar, authentication: { enabled: false, secret: "" } } };
  const options = { upsert: true, new: true };
  await User.findOneAndUpdate(query, update, options);
};
