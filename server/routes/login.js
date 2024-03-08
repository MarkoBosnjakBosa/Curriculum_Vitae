import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import speakeasy from "speakeasy";
import User from "../models/user.js";

export const login = async (request, response) => {
  const { username, password } = request.body;
  const query = { username };
  const user = await User.findOne(query);
  const match = bcryptjs.compareSync(password, user.password);
  if (match) {
    const { _id: userId, authentication } = user;
    const { enabled } = authentication;
    if (enabled) return response.status(200).json({ authentication: true, userId, username }).end();
    else {
      const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY);
      return response.status(200).json({ authentication: false, token, userId, username }).end();
    }
  } else return response.status(401).json({ errors: "Password does not match!" }).end();
};

export const authenticate = async (request, response) => {
  const { userId } = request.params;
  const { token: otpToken } = request.body;
  const user = await User.findById(userId);
  const { username, authentication } = user;
  const { secret } = authentication;
  const isVerified = speakeasy.totp.verify({ secret, encoding: "base32", token: otpToken });
  if (isVerified) {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY);
    return response.status(200).json({ token, username }).end();
  }
  else return response.status(400).json({ errors: "The authentication token is not valid!" }).end();
};
