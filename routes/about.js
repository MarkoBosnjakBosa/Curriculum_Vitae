import User from "../models/user.js";
import Skill from "../models/skill.js";
import PortfolioItem from "../models/portfolioItem.js";
import ResumeItem from "../models/resumeItem.js";
import { isEmpty } from "../utilities/validations.js";
import constants from "../utilities/constants.js";

export const about = async (request, response) => {
  const baseUrl = process.env.BASE_URL;
  const { language } = request.params;
  const userQuery = User.findOne();
  const skillsQuery = Skill.find();
  const portfolioItemQuery = PortfolioItem.find();
  const resumeItemQuery = ResumeItem.find().sort({ _id : -1 });
  const queries = [userQuery, skillsQuery, portfolioItemQuery, resumeItemQuery];
  const results = await Promise.all(queries);
  const user = results[0];
  const skills = results[1];
  const workPortfolio = results[2].filter((portfolioItem) => portfolioItem.type === constants.WORK_PORTFOLIO);
  const personalPortfolio = results[2].filter((portfolioItem) => portfolioItem.type === constants.PERSONAL_PORTFOLIO);
  const academicPortfolio = results[2].filter((portfolioItem) => portfolioItem.type === constants.ACADEMIC_PORTFOLIO);
  const portfolio = { workPortfolio, personalPortfolio, academicPortfolio };
  const experienceResume = results[3].filter((resumeItem) => resumeItem.type === constants.EXPERIENCE_RESUME);
  const educationResume = results[3].filter((resumeItem) => resumeItem.type === constants.EDUCATION_RESUME);
  const resume = { experienceResume, educationResume };
  if (!isEmpty(user) && skills.length && (portfolio.workPortfolio.length && portfolio.personalPortfolio.length && portfolio.academicPortfolio.length) && (resume.experienceResume.length && resume.educationResume.length)) {
    return response.render("about.html", { baseUrl, reCaptcha: process.env.RECAPTCHA_v3_SITE_KEY, isGerman: language === constants.GERMAN_LANGUAGE, user, skills, portfolio, resume });
  } else {
    return response.redirect(`${baseUrl}/pageNotFound`);
  }
};
