import Reference from "../models/reference.js";
import constants from "../../utilities/constants.js";

export const getReferences = async (request, response) => {
  const references = await Reference.find();
  const certifications = references.filter((reference) => reference.type === constants.CERTIFICATION_REFERENCE);
  const customers = references.filter((reference) => reference.type === constants.CUSTOMER_REFERENCE);
  return response.status(200).json({ certifications, customers }).end();
};

export const getReference = async (request, response) => {
  const { referenceId } = request.params;
  const reference = await Reference.findById(referenceId);
  return response.status(200).json(reference).end();
};

export const createReference = async (request, response) => {
  const { title, title_de, duration, duration_de, type, logo } = request.body;
  const newReference = new Reference({ title, title_de, duration, duration_de, type, logo });
  const reference = await newReference.save();
  return response.status(200).json(reference).end();
};

export const editReference = async (request, response) => {
  const { referenceId } = request.params;
  const { title, title_de, duration, duration_de, type, logo } = request.body;
  const update = { title, title_de, duration, duration_de, type, logo };
  const options = { new: true };
  const reference = await Reference.findByIdAndUpdate(referenceId, update, options);
  return response.status(200).json(reference).end();
};

export const deleteReference = async (request, response) => {
  const { referenceId } = request.params;
  await Reference.findByIdAndDelete(referenceId);
  return response.status(200).send(true).end();
};
