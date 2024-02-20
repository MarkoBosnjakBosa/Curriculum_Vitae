import Skill from "../models/skill.js";
import PortfolioItem from "../models/portfolioItem.js";
import ResumeItem from "../models/resumeItem.js";
import Reference from "../models/reference.js";
import Contact from "../models/contact.js";
import { validEmail, validPassword, validName, validTelephone, validDate, validText, validLink, validMimeType, validToken, validType, validUser, validItem, validReCaptcha, validObject } from "../../utilities/validations.js";
import constants from "../../utilities/constants.js";

const validateLogin = async (request, response, next) => {
  let errors = [];
  const username = request.body.username;
  const isUserValid = await validUser(username);
  if (!isUserValid) errors = [...errors, "username"];
  const password = request.body.password;
  if (!validPassword(password)) errors = [...errors, "password"];
  if (!errors.length) return next();
  else return response.status(400).json({ errors }).end();
};

const validateProfile = async (request, response, next) => {
  const userId = request.params.userId;
  const isUserValid = await validUser(userId);
  if (isUserValid) {
    if (request.method === "PUT") {
      let errors = [];
      const firstName = request.body.firstName;
      if (!validName(firstName)) errors = [...errors, "firstName"];
      const lastName = request.body.lastName;
      if (!validName(lastName)) errors = [...errors, "lastName"];
      const email = request.body.email;
      if (!validEmail(email)) errors = [...errors, "email"];
      const telephone = request.body.telephone;
      if (!validTelephone(telephone)) errors = [...errors, "telephone"];
      const birthday = request.body.birthday;
      if (!validDate(birthday, false)) errors = [...errors, "birthday"];
      const birthday_de = request.body.birthday_de;
      if (!validDate(birthday_de, true)) errors = [...errors, "birthday DE"];
      const address = request.body.address;
      if (!validText(address)) errors = [...errors, "address"];
      const address_de = request.body.address_de;
      if (!validText(address_de)) errors = [...errors, "address DE"];
      const languages = request.body.languages;
      if (!validText(languages)) errors = [...errors, "languages"];
      const languages_de = request.body.languages_de;
      if (!validText(languages_de)) errors = [...errors, "languages DE"];
      const profession = request.body.profession;
      if (!validText(profession)) errors = [...errors, "profession"];
      const profession_de = request.body.profession_de;
      if (!validText(profession_de)) errors = [...errors, "profession DE"];
      const linkedIn = request.body.linkedIn;
      if (!validLink(linkedIn)) errors = [...errors, "linkedIn"];
      const xing = request.body.xing;
      if (!validLink(xing)) errors = [...errors, "xing"];
      const gitHub = request.body.gitHub;
      if (!validLink(gitHub)) errors = [...errors, "gitHub"];
      if (!errors.length) return next();
      else return response.status(400).json({ errors }).end();
    } else return next();
  }
  else return response.status(401).json({ errors: "The provided user does not exist!" }).end();
};

const validateAvatar = async (request, response, next) => {
  const userId = request.params.userId;
  const isUserValid = await validUser(userId);
  if (isUserValid) {
    const avatar = request.body.avatar;
    if (validObject(avatar)) {
      if (validText(avatar.name) && validMimeType(avatar.mimeType) && validText(avatar.data)) return next();
    }
    return response.status(400).json({ errors: "The avatar is not valid!" }).end();
  }
  else return response.status(401).json({ errors: "The provided user does not exist!" }).end();
};

const validatePassword = async (request, response, next) => {
  const userId = request.params.userId;
  const isUserValid = await validUser(userId);
  if (isUserValid) {
    const password = request.body.password;
    if (validPassword(password)) return next();
    else return response.status(400).json({ errors: ["password"] }).end();
  }
  else return response.status(401).json({ errors: "The provided user does not exist!" }).end();
};

const validateAuthentication = async (request, response, next) => {
  const userId = request.params.userId;
  const isUserValid = await validUser(userId);
  if (isUserValid) {
    const method = request.method;
    if (method === "POST") {
      const token = request.body.token;
      if (validToken(token)) return next();
      else return response.status(400).json({ errors: ["token"] }).end();
    } else if (method === "PUT") {
      const isEnabled = request.body.isEnabled;
      if (isEnabled) {
        const token = request.body.token;
        if (validToken(token)) return next();
        else return response.status(400).json({ errors: ["token"] }).end();
      } else return next();
    } else return next();
  }
  else return response.status(401).json({ errors: "The provided user does not exist!" }).end();
};

const validateSkill = async (request, response, next) => {
  const skillId = request.params.skillId;
  const isSkillValid = await validItem(skillId, Skill);
  if (isSkillValid) {
    if (request.method === "PUT") {
      const title = request.body.title;
      if (validText(title)) return next();
      else return response.status(400).json({ errors: ["title"] }).end();
    } else return next();
  }
  else return response.status(400).json({ errors: "The provided skill does not exist!" }).end();
};

const validateNewSkill = (request, response, next) => {
  const title = request.body.title;
  if (validText(title)) return next();
  else return response.status(400).json({ errors: ["title"] }).end();
};

const validatePortfolioItem = async (request, response, next) => {
  const portfolioItemId = request.params.portfolioItemId;
  const isPortfolioItemValid = await validItem(portfolioItemId, PortfolioItem);
  if (isPortfolioItemValid) {
    if (request.method === "PUT") {
      let errors = [];
      const title = request.body.title;
      if (!validText(title)) errors = [...errors, "title"];
      const link = request.body.link;
      if (!validLink(link)) errors = [...errors, "link"];
      const type = request.body.type;
      if (!validType(type, constants.PORTFOLIO_ITEM)) errors = [...errors, "type"];
      const logo = request.body.logo;
      if (!validObject(logo)) errors = [...errors, "logo"];
      else if (!validText(logo.name) || !validMimeType(logo.mimeType) || !validText(logo.data)) errors = [...errors, "logo"];
      if (!errors.length) return next();
      else return response.status(400).json({ errors }).end();
    } else return next();
  }
  else return response.status(400).json({ errors: "The provided portfolio item does not exist!" }).end();
};

const validateNewPortfolioItem = (request, response, next) => {
  let errors = [];
  const title = request.body.title;
  if (!validText(title)) errors = [...errors, "title"];
  const link = request.body.link;
  if (!validLink(link)) errors = [...errors, "link"];
  const type = request.body.type;
  if (!validType(type, constants.PORTFOLIO_ITEM)) errors = [...errors, "type"];
  const logo = request.body.logo;
  if (!validObject(logo)) errors = [...errors, "logo"];
  else if (!validText(logo.name) || !validMimeType(logo.mimeType) || !validText(logo.data)) errors = [...errors, "logo"];
  if (!errors.length) return next();
  else return response.status(400).json({ errors }).end();
};

const validateResumeItem = async (request, response, next) => {
  const resumeItemId = request.params.resumeItemId;
  const isResumeItemValid = await validItem(resumeItemId, ResumeItem);
  if (isResumeItemValid) {
    if (request.method === "PUT") {
      let errors = [];
      const title = request.body.title;
      if (!validText(title)) errors = [...errors, "title"];
      const title_de = request.body.title_de;
      if (!validText(title_de)) errors = [...errors, "title DE"];
      const workPlace = request.body.workPlace;
      if (!validText(workPlace)) errors = [...errors, "work place"];
      const workPlace_de = request.body.workPlace_de;
      if (!validText(workPlace_de)) errors = [...errors, "work place DE"];
      const duration = request.body.duration;
      if (!validText(duration)) errors = [...errors, "duration"];
      const duration_de = request.body.duration_de;
      if (!validText(duration_de)) errors = [...errors, "duration DE"];
      const type = request.body.type;
      if (!validType(type, constants.RESUME_ITEM)) errors = [...errors, "type"];
      if (!errors.length) return next();
      else return response.status(400).json({ errors }).end();
    } else return next();
  }
  else return response.status(400).json({ errors: "The provided resume item does not exist!" }).end();
};

const validateNewResumeItem = (request, response, next) => {
  let errors = [];
  const title = request.body.title;
  if (!validText(title)) errors = [...errors, "title"];
  const title_de = request.body.title_de;
  if (!validText(title_de)) errors = [...errors, "title DE"];
  const workPlace = request.body.workPlace;
  if (!validText(workPlace)) errors = [...errors, "work place"];
  const workPlace_de = request.body.workPlace_de;
  if (!validText(workPlace_de)) errors = [...errors, "work place DE"];
  const duration = request.body.duration;
  if (!validText(duration)) errors = [...errors, "duration"];
  const duration_de = request.body.duration_de;
  if (!validText(duration_de)) errors = [...errors, "duration DE"];
  const type = request.body.type;
  if (!validType(type, constants.RESUME_ITEM)) errors = [...errors, "type"];
  if (!errors.length) return next();
  else return response.status(400).json({ errors }).end();
};

const validateReference = async (request, response, next) => {
  const referenceId = request.params.referenceId;
  const isReferenceValid = await validItem(referenceId, Reference);
  if (isReferenceValid) {
    if (request.method === "PUT") {
      let errors = [];
      const title = request.body.title;
      if (!validText(title)) errors = [...errors, "title"];
      const title_de = request.body.title_de;
      if (!validText(title_de)) errors = [...errors, "title DE"];
      const duration = request.body.duration;
      if (!validText(duration)) errors = [...errors, "duration"];
      const duration_de = request.body.duration_de;
      if (!validText(duration_de)) errors = [...errors, "duration DE"];
      const type = request.body.type;
      if (!validType(type, constants.REFERENCE)) errors = [...errors, "type"];
      const logo = request.body.logo;
      if (!validObject(logo)) errors = [...errors, "logo"];
      else if (!validText(logo.name) || !validMimeType(logo.mimeType) || !validText(logo.data)) errors = [...errors, "logo"];
      if (!errors.length) return next();
      else return response.status(400).json({ errors }).end();
    } else return next();
  }
  else return response.status(400).json({ errors: "The provided reference does not exist!" }).end();
};

const validateNewReference = (request, response, next) => {
  let errors = [];
  const title = request.body.title;
  if (!validText(title)) errors = [...errors, "title"];
  const title_de = request.body.title_de;
  if (!validText(title_de)) errors = [...errors, "title DE"];
  const duration = request.body.duration;
  if (!validText(duration)) errors = [...errors, "duration"];
  const duration_de = request.body.duration_de;
  if (!validText(duration_de)) errors = [...errors, "duration DE"];
  const type = request.body.type;
  if (!validType(type, constants.REFERENCE)) errors = [...errors, "type"];
  const logo = request.body.logo;
  if (!validObject(logo)) errors = [...errors, "logo"];
  else if (!validText(logo.name) || !validMimeType(logo.mimeType) || !validText(logo.data)) errors = [...errors, "logo"];
  if (!errors.length) return next();
  else return response.status(400).json({ errors }).end();
};

const validateContact = async (request, response, next) => {
  const contactId = request.params.contactId;
  const isContactValid = await validItem(contactId, Contact);
  if (isContactValid) return next();
  else return response.status(400).json({ errors: "The provided contact does not exist!" }).end();
};

const validateNewContact = (request, response, next) => {
  let errors = [];
  const name = request.body.name;
  if (!validName(name)) errors = [...errors, "name"];
  const email = request.body.email;
  if (!validEmail(email)) errors = [...errors, "email"];
  const subject = request.body.subject;
  if (!validText(subject)) errors = [...errors, "subject"];
  const message = request.body.message;
  if (!validText(message)) errors = [...errors, "message"];
  const reCaptchaToken = request.body.reCaptchaToken;
  if (!validText(reCaptchaToken)) errors = [...errors, "ReCaptcha"];
  if (!errors.length) {
    const reCaptchaVerificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_v3_SECRET_KEY}&response=${reCaptchaToken}&remoteip=${request.connection.remoteAddress}`;
    if (validReCaptcha(reCaptchaVerificationUrl)) return next();
    else return response.status(400).json({ errors: "ReCaptcha" }).end();
  }
  else return response.status(400).json({ errors }).end();
};

const validations = { validateLogin, validateProfile, validateAvatar, validatePassword, validateAuthentication, validateSkill, validateNewSkill, validatePortfolioItem, validateNewPortfolioItem, validateResumeItem, validateNewResumeItem, validateReference, validateNewReference, validateContact, validateNewContact };

export default validations;
