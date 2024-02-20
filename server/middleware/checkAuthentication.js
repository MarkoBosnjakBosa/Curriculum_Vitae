import jwt from "jsonwebtoken";
import { validUser } from "../../utilities/validations.js";

export const isLoggedIn = async (request, response, next) => {
  try {
    const token = request.headers.authentication.split(" ")[1];
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const { userId } = verifiedToken;
    if (validUser(userId)) return next();
    else return response.status(401).json({ errors: "No permission!" }).end();
  } catch (error) {
    return response.status(401).json({ errors: "No permission!" }).end();
  }
};
