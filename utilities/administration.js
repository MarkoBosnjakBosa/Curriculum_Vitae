import bcryptjs from "bcryptjs";
import * as fs from "fs";
import path from "path";
import User from "../models/user.js";
const directory = path.resolve();

export const createAdministrator = async () => {
  const password = process.env.ADMINISTRATOR_DEFAULT_PASSWORD;
  const salt = bcryptjs.genSaltSync(Number(process.env.BCRYPTJS_COST_FACTOR));
  const hashedPassword = bcryptjs.hashSync(password, salt);
  const username = process.env.ADMINISTRATOR_DEFAULT_USERNAME;
  const query = { username };
  const readAvatar = fs.readFileSync(`${directory}/images/avatarImage.jpg`);
  const encodedAvatar = readAvatar.toString("base64");
  const avatarObject = { name: "avatarImage.jpg", mimeType: "image/jpg", buffer: Buffer.from(encodedAvatar, "base64") };
  const update = { $setOnInsert: { username, password: hashedPassword, firstName: "", lastName: "", email: "", telephone: "", address: "", address_de: "", birthday: "", birthday_de: "", languages: "", languages_de: "", profession: "", profession_de: "", linkedIn: "", xing: "", gitHub: "", avatar: avatarObject } };
  const options = { upsert: true, new: true };
  await User.findOneAndUpdate(query, update, options);
};
