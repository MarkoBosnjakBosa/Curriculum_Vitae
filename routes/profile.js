import * as fs from "fs";
import path from "path";
import formidable from "formidable";
import User from "../models/user.js";
import { createImageObject } from "../utilities/scripts.js";
import { isEmpty } from "../utilities/validations.js";
const directory = path.resolve();

export const profile = async (request, response) => {
  const baseUrl = process.env.BASE_URL;
  const { userId } = request.session;
  const user = await User.findById(userId);
  if (!isEmpty(user)) {
    user.password = null;
    return response.render("profile.html", { baseUrl, user });
  } else {
    return response.redirect(`${baseUrl}/login`);
  }
};

export const editProfile = async (request, response) => {
  const { userId } = request.session;
  const { firstName, lastName, email, telephone, birthday, birthday_de, address, address_de, languages, languages_de, profession, profession_de, linkedIn, xing, gitHub } = request.body;
  const update = { firstName, lastName, email, telephone, birthday, birthday_de, address, address_de, languages, languages_de, profession, profession_de, linkedIn, xing, gitHub };
  const options = { new: true };
  const user = await User.findByIdAndUpdate(userId, update, options);
  if (!isEmpty(user)) {
    return response.status(200).send(true).end();
  } else {
    return response.status(401).json({ errors: "The provided user does not exist!" }).end();
  }
};

export const editAvatar = async (request, response) => {
  const { userId } = request.session;
  const form = new formidable.IncomingForm({ uploadDir: `${directory}/temporary` });
  form.parse(request, async (error, fields, files) => {
    const avatar = files.avatar;
    if (isEmpty(avatar) || (!isEmpty(avatar) && !avatar.mimetype.match("image.*"))) {
      fs.unlinkSync(avatar.filepath);
      return response.status(400).send(false).end();
    }
    const avatarObject = createImageObject(avatar, fs.readFileSync(avatar.filepath));
    const update = { avatar: avatarObject };
    const options = { new: true };
    const user = await User.findByIdAndUpdate(userId, update, options);
    fs.unlinkSync(avatar.filepath);
    if (!isEmpty(user)) {
      const src = `data:${user.avatar.mimeType};base64,${(new Buffer.from(user.avatar.buffer)).toString("base64")}`;
      return response.status(200).json({ src, alt: user.avatar.name }).end();
    } else {
      return response.status(401).json({ errors: "The provided user does not exist!" }).end();
    }
  });
};
