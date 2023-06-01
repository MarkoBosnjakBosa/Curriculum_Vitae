import User from "../models/user.js";
import { isEmpty } from "../utilities/validations.js";

export const overview = async (request, response) => {
  const baseUrl = process.env.BASE_URL;
  const { userId } = request.session;
  const user = await User.findById(userId);
  if (!isEmpty(user)) {
    user.password = null;
    return response.render("overview.html", { baseUrl, user });
  } else {
    return response.redirect(`${baseUrl}/login`);
  }
};
