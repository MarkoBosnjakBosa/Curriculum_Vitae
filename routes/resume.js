import ResumeItem from "../models/resumeItem.js";
import { isEmpty } from "../utilities/validations.js";
import constants from "../utilities/constants.js";

export const resume = async (request, response) => {
  const resume = await ResumeItem.find();
  const experienceResume = resume.filter((resumeItem) => resumeItem.type === constants.EXPERIENCE_RESUME);
  const educationResume = resume.filter((resumeItem) => resumeItem.type === constants.EDUCATION_RESUME);
  return response.render("resume.html", { baseUrl: process.env.BASE_URL, experienceResume, educationResume });
};

export const getResumeItem = async (request, response) => {
  const { resumeItemId } = request.params;
  const resumeItem = await ResumeItem.findById(resumeItemId);
  if (!isEmpty(resumeItem)) {
    return response.status(200).json(resumeItem).end();
  } else {
    return response.status(400).json({ errors: "The provided resume item does not exist!" }).end();
  }
};

export const createResumeItem = async (request, response) => {
  const { title, title_de, workPlace, workPlace_de, duration, duration_de, description, description_de, type } = request.body;
  const newResumeItem = new ResumeItem({ title, title_de, workPlace, workPlace_de, duration, duration_de, description, description_de, type });
  const resumeItem = await newResumeItem.save();
  return response.status(200).json({ resumeItem, isCreated: true }).end();
};

export const editResumeItem = async (request, response) => {
  const { resumeItemId, title, title_de, workPlace, workPlace_de, duration, duration_de, description, description_de, type } = request.body;
  const update = { title, title_de, workPlace, workPlace_de, duration, duration_de, description, description_de, type };
  const options = { new: true };
  const resumeItem = await ResumeItem.findByIdAndUpdate(resumeItemId, update, options);
  if (!isEmpty(resumeItem)) {
    return response.status(200).json({ resumeItem, isCreated: false }).end();
  } else {
    return response.status(400).json({ errors: "The provided resume item does not exist!" }).end();
  }
};

export const deleteResumeItem = async (request, response) => {
  const { resumeItemId } = request.params;
  const resumeItem = await ResumeItem.findByIdAndDelete(resumeItemId);
  if (!isEmpty(resumeItem)) {
    return response.status(200).send(true).end();
  } else {
    return response.status(400).json({ errors: "The provided resume item does not exist!" }).end();
  }
};
