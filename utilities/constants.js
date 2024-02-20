import { getString } from "../client/utilities/i18n.js";

const ABOUT_SECTIONS = [getString("cv.sections.about"), getString("cv.sections.skills"), getString("cv.sections.portfolio"), getString("cv.sections.experience"), getString("cv.sections.education"), getString("cv.sections.certifications"), getString("cv.sections.customers"), getString("cv.sections.contact")];
const ADMINISTRATOR_SECTIONS = ["Skills", "Portfolio", "Resume", "References", "Contacts"];
const SKILLS_LABELS = ["Title", "Actions"];
const PORTFOLIO_LABELS = ["Title", "Link", "Logo", "Type", "Actions"];
const RESUME_LABELS = ["", "Title", "Work place", "Duration", "Description", "Type", "Actions"];
const REFERENCES_LABELS = ["", "Title", "Duration", "Logo", "Type", "Actions"];
const CONTACTS_LABELS = ["Language", "Name", "Email", "Subject", "Message", "Date", "Answered", "Actions"];
const PORTFOLIO_ITEM = "portfolio";
const RESUME_ITEM = "resume";
const REFERENCE = "reference";
const WORK_PORTFOLIO = "work";
const PERSONAL_PORTFOLIO = "personal";
const ACADEMIC_PORTFOLIO = "academic";
const EXPERIENCE_RESUME = "experience";
const EDUCATION_RESUME = "education";
const CERTIFICATION_REFERENCE = "certification";
const CUSTOMER_REFERENCE = "customer";
const PORTFOLIO_OPTIONS = [{ id: "work", title: "Work" }, { id: "personal", title: "Personal" }, { id: "academic", title: "Academic" }];
const RESUME_OPTIONS = [{ id: "experience", title: "Experience" }, { id: "education", title: "Education" }];
const REFERENCES_OPTIONS = [{ id: "certification", title: "Certification" }, { id: "customer", title: "Customer" }];
const DATE_TIME_FORMAT = { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" };
const CREATED_ACTION = "created";
const EDITED_ACTION = "edited";
const DELETED_ACTION = "deleted";
const REGULAR_FONT = "https://fonts.gstatic.com/s/rokkitt/v36/qFdb35qfgYFjGy5hukqqhw5XeRgdi1ryd5DLE76HvN6n.ttf";
const BOLD_FONT = "https://fonts.gstatic.com/s/rokkitt/v36/qFdb35qfgYFjGy5hukqqhw5XeRgdi1oVcJDLE76HvN6n.ttf";
const ITALIC_FONT = "https://fonts.gstatic.com/s/rokkitt/v36/qFdV35qfgYFjGy5hkEOYeNY-EoKzjE86NHiIGbqluc6nu9E.ttf";

const constants = { 
  ABOUT_SECTIONS,
  ADMINISTRATOR_SECTIONS,
  SKILLS_LABELS,
  PORTFOLIO_LABELS,
  RESUME_LABELS,
  REFERENCES_LABELS,
  CONTACTS_LABELS,
  PORTFOLIO_ITEM,
  RESUME_ITEM,
  REFERENCE,
  WORK_PORTFOLIO,
  PERSONAL_PORTFOLIO,
  ACADEMIC_PORTFOLIO,
  EXPERIENCE_RESUME,
  EDUCATION_RESUME,
  CERTIFICATION_REFERENCE,
  CUSTOMER_REFERENCE,
  PORTFOLIO_OPTIONS,
  RESUME_OPTIONS,
  REFERENCES_OPTIONS,
  DATE_TIME_FORMAT,
  CREATED_ACTION,
  EDITED_ACTION,
  DELETED_ACTION,
  REGULAR_FONT,
  BOLD_FONT,
  ITALIC_FONT
};

export default constants;
