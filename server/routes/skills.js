import Skill from "../models/skill.js";

export const getSkills = async (request, response) => {
  const skills = await Skill.find();
  return response.status(200).json(skills).end();
};

export const getSkill = async (request, response) => {
  const { skillId } = request.params;
  const skill = await Skill.findById(skillId);
  return response.status(200).json(skill).end();
};

export const createSkill = async (request, response) => {
  const { body } = request;
  const newSkill = new Skill(body);
  const skill = await newSkill.save();
  return response.status(200).json(skill).end();
};

export const editSkill = async (request, response) => {
  const { skillId } = request.params;
  const { body } = request;
  const options = { new: true };
  const skill = await Skill.findByIdAndUpdate(skillId, body, options);
  return response.status(200).json(skill).end();
};

export const deleteSkill = async (request, response) => {
  const { skillId } = request.params;
  await Skill.findByIdAndDelete(skillId);
  return response.status(200).send(true).end();
};
