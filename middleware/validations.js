import { validUsername, validPassword, validName, validEmail, validTelephone, validBirthday, validText, validLink, validReCaptcha, validType, validObjectId } from "../utilities/validations.js";
import constants from "../utilities/constants.js";

const validateLogin = (request, response, next) => {
  let errors = [];
  const username = request.body.username;
  if (!validUsername(username)) {
    errors = [...errors, "username"];
  }
  const password = request.body.password;
  if (!validPassword(password)) {
    errors = [...errors, "password"];
  }
  if (!errors.length) return next();
  else return response.status(400).json({ errors }).end();
};

const validateUsernameCheck = (request, response, next) => {
  const username = request.body.username;
  if (validUsername(username)) return next();
  return response.status(400).send(false).end();
};

const validateProfile = (request, response, next) => {
  let errors = [];
  const userId = request.session.userId;
  const firstName = request.body.firstName;
  if (!validObjectId(userId) || !validName(firstName)) {
    errors = [...errors, "firstName"];
  }
  const lastName = request.body.lastName;
  if (!validName(lastName)) {
    errors = [...errors, "lastName"];
  }
  const email = request.body.email;
  if (!validEmail(email)) {
    errors = [...errors, "email"];
  }
  const telephone = request.body.telephone;
  if (!validTelephone(telephone)) {
    errors = [...errors, "telephone"];
  }
  const birthday = request.body.birthday;
  if (!validBirthday(birthday, false)) {
    errors = [...errors, "birthday"];
  }
  const birthday_de = request.body.birthday_de;
  if (!validBirthday(birthday_de, true)) {
    errors = [...errors, "birthday_de"];
  }
  const address = request.body.address;
  if (!validText(address)) {
    errors = [...errors, "address"];
  }
  const address_de = request.body.address_de;
  if (!validText(address_de)) {
    errors = [...errors, "address_de"];
  }
  const languages = request.body.languages;
  if (!validText(languages)) {
    errors = [...errors, "languages"];
  }
  const languages_de = request.body.languages_de;
  if (!validText(languages_de)) {
    errors = [...errors, "languages_de"];
  }
  const profession = request.body.profession;
  if (!validText(profession)) {
    errors = [...errors, "profession"];
  }
  const profession_de = request.body.profession_de;
  if (!validText(profession_de)) {
    errors = [...errors, "profession_de"];
  }
  const linkedIn = request.body.linkedIn;
  if (!validLink(linkedIn)) {
    errors = [...errors, "linkedIn"];
  }
  const xing = request.body.xing;
  if (!validLink(xing)) {
    errors = [...errors, "xing"];
  }
  const gitHub = request.body.gitHub;
  if (!validLink(gitHub)) {
    errors = [...errors, "gitHub"];
  }
  if (!errors.length) return next();
  else return response.status(400).json({ errors }).end();
};

const validatePasswordReset = (request, response, next) => {
  const userId = request.session.userId;
  const password = request.body.password;
  if (validObjectId(userId) && validPassword(password)) return next();
  else return response.status(400).json({ errors: ["password"] }).end();
};

const validateSkill = (request, response, next) => {
  if (request.method === "PUT") {
    const skillId = request.body.skillId;
    if (!validObjectId(skillId)) return response.status(400).json({ errors: "The provided skill does not exist!" }).end();
  }
  const title = request.body.title;
  if (validText(title)) next();
  else return response.status(400).json({ errors: ["title"] }).end();
};

const validateResumeItem = (request, response, next) => {
  if (request.method === "PUT") {
    const resumeItemId = request.body.resumeItemId;
    if (!validObjectId(resumeItemId)) return response.status(400).json({ errors: "The provided resume item does not exist!" }).end();
  }
  let errors = [];
  const title = request.body.title;
  if (!validText(title)) {
    errors = [...errors, "title"];
  }
  const title_de = request.body.title_de;
  if (!validText(title_de)) {
    errors = [...errors, "title_de"];
  }
  const workPlace = request.body.workPlace;
  if (!validText(workPlace)) {
    errors = [...errors, "workPlace"];
  }
  const workPlace_de = request.body.workPlace_de;
  if (!validText(workPlace_de)) {
    errors = [...errors, "workPlace_de"];
  }
  const duration = request.body.duration;
  if (!validText(duration)) {
    errors = [...errors, "duration"];
  }
  const duration_de = request.body.duration_de;
  if (!validText(duration_de)) {
    errors = [...errors, "duration_de"];
  }
  const description = request.body.description;
  if (!validText(description)) {
    errors = [...errors, "description"];
  }
  const description_de = request.body.description_de;
  if (!validText(description_de)) {
    errors = [...errors, "description_de"];
  }
  const type = request.body.type;
  if (!validType(type, constants.RESUME_ITEM)) {
    errors = [...errors, "type"];
  }
  if (!errors.length) return next();
  else return response.status(400).json({ errors }).end();
};

const validateContact = (request, response, next) => {
  let errors = [];
  const name = request.body.name;
  if (!validName(name)) {
    errors = [...errors, "name"];
  }
  const email = request.body.email;
  if (!validEmail(email)) {
    errors = [...errors, "email"];
  }
  const subject = request.body.subject;
  if (!validText(subject)) {
    errors = [...errors, "subject"];
  }
  const message = request.body.message;
  if (!validText(message)) {
    errors = [...errors, "message"];
  }
  const reCaptchaToken = request.body.reCaptchaToken;
  if (!reCaptchaToken) {
    errors = [...errors, "ReCaptcha"];
  }
  if (!errors.length) {
    const reCaptchaVerificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_v3_SECRET_KEY}&response=${reCaptchaToken}&remoteip=${request.connection.remoteAddress}`;
    if (validReCaptcha(reCaptchaVerificationUrl)) {
      return next();
    } else {
      return response.status(400).json({ errors: "Please confirm ReCaptcha!" }).end();
    }
  }
  else return response.status(400).json({ errors }).end();
};

const validateObjectId = (request, response, next) => {
  const url = request.url;
  let objectId;
  if (url.includes("/getSkill/") || url.includes("/deleteSkill/")) {
    objectId = request.params.skillId;
  }
  if (url.includes("/getPortfolioItem/") || url.includes("/deletePortfolioItem/")) {
    objectId = request.params.portfolioItemId;
  }
  if (url.includes("/getResumeItem/") || url.includes("/deleteResumeItem/")) {
    objectId = request.params.resumeItemId;
  }
  if (url.includes("/answerContact")) {
    objectId = request.body.contactId;
  }
  if (url.includes("/deleteContact/")) {
    objectId = request.params.contactId;
  }
  if (validObjectId(objectId)) return next();
  else return response.status(400).json({ errors: "The provided object id does not exist!" }).end();
};

const validations = {
  validateLogin,
  validateUsernameCheck,
  validateProfile,
  validatePasswordReset,
  validateSkill,
  validateResumeItem,
  validateContact,
  validateObjectId
};

export default validations;
