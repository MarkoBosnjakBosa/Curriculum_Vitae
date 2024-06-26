import User from "../server/models/user.js";
import Skill from "../server/models/skill.js";
import PortfolioItem from "../server/models/portfolioItem.js";
import ResumeItem from "../server/models/resumeItem.js";
import Reference from "../server/models/reference.js";
import Contact from "../server/models/contact.js";
import constants from "./constants.js";

export const validUsername = (username) => username && /^[a-z0-9_.-]*$/.test(username);

export const validEmail = (email) => email && /^\S+@\S+\.\S+$/.test(email);

export const validPassword = (password) => password && /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);

export const validName = (name) => name && (name.constructor === String) && name.trim().length;

export const validTelephone = (telephone) => telephone && /^[1-9]\d*$/.test(telephone);

export const validDate = (date, isGerman) => {
  const dateFormat = isGerman ? /^(0?[1-9]|[12][0-9]|3[01])[\.](0?[1-9]|1[012])[\.]\d{4}$/ : /^(0?[1-9]|1[012])[\/](0?[1-9]|[12][0-9]|3[01])[\/]\d{4}$/;
  return (date && dateFormat.test(date));
};

export const validText = (text) => text && (text.constructor === String) && text.trim().length;

export const validLink = (link) => link && /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/.test(link);

export const validFile = (file) => file && (file.constructor === File);

export const validMimeType = (mimeType) => mimeType && mimeType.includes("image/");

export const validToken = (token) => token && /^\d{6}$/.test(token);

export const validType = (type, item) => {
  if (item === constants.PORTFOLIO_ITEM) {
    return (type && ((type === constants.WORK_PORTFOLIO) || (type === constants.PERSONAL_PORTFOLIO) || (type === constants.ACADEMIC_PORTFOLIO)));
  } else if (item === constants.RESUME_ITEM) {
    return (type && ((type === constants.EXPERIENCE_RESUME) || (type === constants.EDUCATION_RESUME)));
  } else if (item === constants.REFERENCE) {
    return (type && ((type === constants.CERTIFICATION_REFERENCE) || (type === constants.CUSTOMER_REFERENCE)));
  } else {
    return false;
  }
};

export const validProfile = (user) => (validObject(user) && validObjectId(user._id) && validUsername(user.username) && validName(user.firstName) && validName(user.lastName) && validEmail(user.email) && validTelephone(user.telephone) && validDate(user.birthday, false) && validDate(user.birthday_de, true) && validText(user.address) && validText(user.address_de) && validText(user.languages) && validText(user.languages_de) && validText(user.profession) && validText(user.profession_de) && validLink(user.linkedIn) && validLink(user.xing) && validLink(user.gitHub) && validObject(user.avatar) && validText(user.avatar.name) && validMimeType(user.avatar.mimeType) && validText(user.avatar.data));

export const validUser = async (userInformation) => {
  if (validObjectId(userInformation)) {
    const user = await User.findById(userInformation);
    return validObject(user);
  } else if (validUsername(userInformation)) {
    const query = { username: userInformation };
    const user = await User.findOne(query);
    return validObject(user);
  } else {
    return false;
  }
};

export const validItem = async (itemId, Model) => {
  if (validObjectId(itemId)) {
    const item = await Model.findById(itemId);
    return validObject(item);
  } else {
    return false;
  }
};

export const validReCaptcha = async (reCaptchaVerificationUrl) => {
  const response = await fetch(reCaptchaVerificationUrl);
  if (!response.ok) return false;
  const { success } = await response.json();
  return success;
};

export const validObjectId = (objectId) => objectId && /^[a-fA-F0-9]{24}$/.test(objectId);

export const validObject = (object) => object && ((object.constructor === Object) || (object.constructor === User) || (object.constructor === Skill) || (object.constructor === PortfolioItem) || (object.constructor === ResumeItem) || (object.constructor === Reference) || (object.constructor === Contact)) && Object.keys(object).length;

export const validArray = (array) => array && ((array.constructor === Array) || (array.constructor === FileList) || (array.constructor === HTMLCollection)) && array.length;
