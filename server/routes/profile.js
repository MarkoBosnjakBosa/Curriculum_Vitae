import bcryptjs from "bcryptjs";
import speakeasy from "speakeasy";
import QRCode from "qrcode";
import User from "../models/user.js";

export const getProfile = async (request, response) => {
  const { userId } = request.params;
  const user = await User.findById(userId);
  user.password = null;
  user.authentication.secret = null;
  return response.status(200).json(user).end();
};

export const editProfile = async (request, response) => {
  const { userId } = request.params;
  const { body } = request;
  const options = { new: true };
  const user = await User.findByIdAndUpdate(userId, body, options);
  user.password = null;
  user.authentication.secret = null;
  return response.status(200).json(user).end();
};

export const editAvatar = async (request, response) => {
  const { userId } = request.params;
  const { avatar } = request.body;
  const update = { avatar };
  const options = { new: true };
  await User.findByIdAndUpdate(userId, update, options);
  return response.status(200).json(avatar).end();
};

export const editPassword = async (request, response) => {
  const { userId } = request.params;
  const { password } = request.body;
  const salt = bcryptjs.genSaltSync(Number(process.env.BCRYPTJS_COST_FACTOR));
  const hashedPassword = bcryptjs.hashSync(password, salt);
  const update = { password: hashedPassword };
  const options = { new: true };
  await User.findByIdAndUpdate(userId, update, options);
  return response.status(200).send(true).end();
};

export const getSecret = async (request, response) => {
  const { userId } = request.params;
  const secret = speakeasy.generateSecret();
  const { otpauth_url, base32 } = secret;
  const qrcode = await QRCode.toDataURL(otpauth_url);
  const update = { "authentication.secret": base32 };
  const options = { new: true };
  await User.findByIdAndUpdate(userId, update, options);
  return response.status(200).json(qrcode).end();
};

export const setAuthentication = async (request, response) => {
  const { userId } = request.params;
  const { isEnabled, token } = request.body;
  const user = await User.findById(userId);
  if (isEnabled) {
    const { authentication } = user;
    const { secret } = authentication;
    const verified = speakeasy.totp.verify({ secret, encoding: "base32", token });
    if (verified) {
      const update = { "authentication.enabled": true };
      const options = { new: true };
      await User.findByIdAndUpdate(userId, update, options);
      return response.status(200).send(isEnabled).end();
    }
    else return response.status(400).json({ errors: "The authentication token is not valid!" }).end();
  } else {
    const update = { "authentication.enabled": false, "authentication.secret": "" };
    const options = { new: true };
    await User.findByIdAndUpdate(userId, update, options);
    return response.status(200).send(isEnabled).end();
  }
};
