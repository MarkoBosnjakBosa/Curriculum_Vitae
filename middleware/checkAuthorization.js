import User from "../models/user.js";
import { validObjectId, isEmpty } from "../utilities/validations.js";

export const hasPermission = async (request, response, next) => {
  try {
    const { userId } = request.session;
    if (validObjectId(userId)) {
      const user = await User.findById(userId);
      if (!isEmpty(user)) {
        return next();
      } else {
        return response.status(401).json({ errors: "No permission!" }).end();
      }
    } else {
      return response.status(401).json({ errors: "No permission!" }).end();
    }
  } catch (error) {
    return response.status(401).json({ errors: "No permission!" }).end();
  }
};
