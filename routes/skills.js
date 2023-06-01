import Skill from "../models/skill.js";
import { isEmpty } from "../utilities/validations.js";

export const skills = async (request, response) => {
  const skills = await Skill.find();
  return response.render("skills.html", { baseUrl: process.env.BASE_URL, skills });
};

export const getSkill = async (request, response) => {
  const { skillId } = request.params;
  const skill = await Skill.findById(skillId);
  if (!isEmpty(skill)) {
    return response.status(200).json(skill).end();
  } else {
    return response.status(400).json({ errors: "The provided skill does not exist!" }).end();
  }
};

export const createSkill = async (request, response) => {
  const { title } = request.body;
  const newSkill = new Skill({ title });
  const skill = await newSkill.save();
  return response.status(200).json(skill).end();
};

export const editSkill = async (request, response) => {
  const { skillId, title } = request.body;
  const update = { title };
  const options = { new: true };
  const skill = await Skill.findByIdAndUpdate(skillId, update, options);
  if (!isEmpty(skill)) {
    return response.status(200).json(skill).end();
  } else {
    return response.status(400).json({ errors: "The provided skill does not exist!" }).end();
  }
};

export const deleteSkill = async (request, response) => {
  const { skillId } = request.params;
  const skill = await Skill.findByIdAndDelete(skillId);
  if (!isEmpty(skill)) {
    return response.status(200).send(true).end();
  } else {
    return response.status(400).json({ errors: "The provided skill does not exist!" }).end();
  }
};
