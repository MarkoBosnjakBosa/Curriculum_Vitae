import bcryptjs from "bcryptjs";
import User from "../models/user.js";
import { validUsername, validObjectId, isEmpty } from "../utilities/validations.js";

export const login = async (request, response) => {
  const baseUrl = process.env.BASE_URL;
  const { userId } = request.session;
  if (validObjectId(userId)) {
    const user = await User.findById(userId);
    if (!isEmpty(user)) {
      return response.redirect(`${baseUrl}/overview`);
    } else {
      return response.render("login.html", { baseUrl });
    }
  } else {
    return response.render("login.html", { baseUrl });
  }
};

export const loginUser = async (request, response) => {
  const { username, password } = request.body;
  const query = { username };
  const user = await User.findOne(query);
  if (!isEmpty(user)) {
    const match = bcryptjs.compareSync(password, user.password);
    if (match) {
      request.session.userId = user._id;
      return response.status(200).send(`${process.env.BASE_URL}/overview`).end();
    } else {
      return response.status(400).json({ errors: ["password"] }).end();
    }
  } else {
    return response.status(400).json({ errors: ["username"] }).end();
  }
};

export const checkUsername = async (request, response) => {
  const { username } = request.body;
  if (validUsername(username)) {
    const query = { username };
    const user = await User.findOne(query);
    if (!isEmpty(user)) {
      return response.status(200).send(true).end();
    } else {
      return response.status(400).send(false).end();
    }
  } else {
    return response.status(400).send(false).end();
  }
};
