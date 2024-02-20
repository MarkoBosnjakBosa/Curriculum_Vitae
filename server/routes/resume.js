import ResumeItem from "../models/resumeItem.js";
import constants from "../../utilities/constants.js";

export const getResume = async (request, response) => {
  const resume = await ResumeItem.find();
  const experienceResume = resume.filter((resumeItem) => resumeItem.type === constants.EXPERIENCE_RESUME);
  const educationResume = resume.filter((resumeItem) => resumeItem.type === constants.EDUCATION_RESUME);
  return response.status(200).json({ experienceResume, educationResume }).end();
};

export const getResumeItem = async (request, response) => {
  const { resumeItemId } = request.params;
  const resumeItem = await ResumeItem.findById(resumeItemId);
  return response.status(200).json(resumeItem).end();
};

export const createResumeItem = async (request, response) => {
  const { title, title_de, workPlace, workPlace_de, duration, duration_de, description, description_de, type } = request.body;
  const newResumeItem = new ResumeItem({ title, title_de, workPlace, workPlace_de, duration, duration_de, description, description_de, type });
  const resumeItem = await newResumeItem.save();
  return response.status(200).json(resumeItem).end();
};

export const editResumeItem = async (request, response) => {
  const { resumeItemId } = request.params;
  const { title, title_de, workPlace, workPlace_de, duration, duration_de, description, description_de, type } = request.body;
  const update = { title, title_de, workPlace, workPlace_de, duration, duration_de, description, description_de, type };
  const options = { new: true };
  const resumeItem = await ResumeItem.findByIdAndUpdate(resumeItemId, update, options);
  return response.status(200).json(resumeItem).end();
};

export const deleteResumeItem = async (request, response) => {
  const { resumeItemId } = request.params;
  await ResumeItem.findByIdAndDelete(resumeItemId);
  return response.status(200).send(true).end();
};
