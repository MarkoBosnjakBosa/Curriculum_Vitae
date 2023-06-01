import User from "../models/user.js";
import { validObjectId, isEmpty } from "../utilities/validations.js";

export const isLoggedIn = async (request, response, next) => {
  const baseUrl = process.env.BASE_URL;
  try {
    const { userId } = request.session;
    if (validObjectId(userId)) {
      const user = await User.findById(userId);
      if (!isEmpty(user)) {
        return next();
      } else {
        return response.redirect(`${baseUrl}/login`);
      }
    } else {
      return response.redirect(`${baseUrl}/login`);
    }
  } catch (error) {
    return response.redirect(`${baseUrl}/login`);
  }
};
