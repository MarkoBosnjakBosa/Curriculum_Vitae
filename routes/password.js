import bcryptjs from "bcryptjs";
import User from "../models/user.js";
import { isEmpty } from "../utilities/validations.js";

export const password = async (request, response) => {
  const baseUrl = process.env.BASE_URL;
  const { userId } = request.session;
  const user = await User.findById(userId);
  if (!isEmpty(user)) {
    return response.render("password.html", { baseUrl });
  } else {
    return response.redirect(`${baseUrl}/login`);
  }
};

export const resetPassword = async (request, response) => {
  const { userId } = request.session;
  const { password } = request.body;
  const salt = bcryptjs.genSaltSync(Number(process.env.BCRYPTJS_COST_FACTOR));
  const hashedPassword = bcryptjs.hashSync(password, salt);
  const update = { password: hashedPassword };
  const options = { new: true };
  const user = await User.findByIdAndUpdate(userId, update, options);
  if (!isEmpty(user)) {
    return response.status(200).send(true).end();
  } else {
    return response.status(401).json({ errors: "The provided user does not exist!" }).end();
  }
};
