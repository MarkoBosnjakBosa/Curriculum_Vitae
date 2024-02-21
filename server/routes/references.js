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
  const { body } = request;
  const newReference = new Reference(body);
  const reference = await newReference.save();
  return response.status(200).json(reference).end();
};

export const editReference = async (request, response) => {
  const { referenceId } = request.params;
  const { body } = request;
  const options = { new: true };
  const reference = await Reference.findByIdAndUpdate(referenceId, body, options);
  return response.status(200).json(reference).end();
};

export const deleteReference = async (request, response) => {
  const { referenceId } = request.params;
  await Reference.findByIdAndDelete(referenceId);
  return response.status(200).send(true).end();
};
