import User from "../models/user.js";
import Skill from "../models/skill.js";
import PortfolioItem from "../models/portfolioItem.js";
import ResumeItem from "../models/resumeItem.js";
import Reference from "../models/reference.js";
import constants from "../../utilities/constants.js";

export const getAbout = async (request, response) => {
  const userQuery = User.findOne();
  const skillsQuery = Skill.find();
  const portfolioQuery = PortfolioItem.find();
  const resumeQuery = ResumeItem.find().sort({ _id : -1 });
  const referencesQuery = Reference.find();
  const queries = [userQuery, skillsQuery, portfolioQuery, resumeQuery, referencesQuery];
  const results = await Promise.all(queries);
  const user = results[0];
  user.password = null;
  user.authentication = null;
  const skills = results[1];
  const workPortfolio = results[2].filter((portfolioItem) => portfolioItem.type === constants.WORK_PORTFOLIO);
  const personalPortfolio = results[2].filter((portfolioItem) => portfolioItem.type === constants.PERSONAL_PORTFOLIO);
  const academicPortfolio = results[2].filter((portfolioItem) => portfolioItem.type === constants.ACADEMIC_PORTFOLIO);
  const experienceResume = results[3].filter((resumeItem) => resumeItem.type === constants.EXPERIENCE_RESUME);
  const educationResume = results[3].filter((resumeItem) => resumeItem.type === constants.EDUCATION_RESUME);
  const certifications = results[4].filter((reference) => reference.type === constants.CERTIFICATION_REFERENCE);
  const customers = results[4].filter((reference) => reference.type === constants.CUSTOMER_REFERENCE);
  return response.status(200).json({ user, skills, workPortfolio, personalPortfolio, academicPortfolio, experienceResume, educationResume, certifications, customers }).end();
};
