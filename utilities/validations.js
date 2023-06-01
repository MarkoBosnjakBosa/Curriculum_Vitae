import constants from "./constants.js";

export const validUsername = (username) => username && /^[a-z0-9_.-]*$/.test(username);

export const validEmail = (email) => email && /\S+@\S+\.\S+/.test(email);

export const validPassword = (password) => password && /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);

export const validName = (name) => name && name.trim().length;

export const validTelephone = (telephone) => telephone && /^[1-9]\d*$/.test(telephone);

export const validBirthday = (birthday, isGerman) => {
  const birthdayFormat = isGerman ? /^(0?[1-9]|[12][0-9]|3[01])[\.](0?[1-9]|1[012])[\.]\d{4}$/ : /^(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[012])[\/]\d{4}$/;
  if (birthday && birthdayFormat.test(birthday)) return true;
  else return false;
};

export const validText = (text) => text && text.trim().length;

export const validLink = (link) => link && /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/.test(link);

export const validType = (type, item) => {
  if (item === constants.PORTFOLIO_ITEM) {
    if (type && ((type === constants.WORK_PORTFOLIO) || (type === constants.PERSONAL_PORTFOLIO) || (type === constants.ACADEMIC_PORTFOLIO))) return true;
    else return false;
  } else {
    if (type && ((type === constants.EXPERIENCE_RESUME) || (type === constants.EDUCATION_RESUME))) return true;
    else return false;
  }
};

export const validLogo = (logo) => logo && logo.type.match("image.*");

export const validReCaptcha = async (reCaptchaVerificationUrl) => {
  const response = await fetch(reCaptchaVerificationUrl);
  if (!response.ok) {
    return false;
  }
  const data = await response.json();
  return data.success;
};

export const validObjectId = (objectId) => objectId && /^[a-fA-F0-9]{24}$/.test(objectId);

export const isEmpty = (object) => !object || Object.keys(object).length === 0;
