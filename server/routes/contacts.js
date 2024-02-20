import User from "../models/user.js";
import Contact from "../models/contact.js";
import { sendEmails } from "../utilities/emails.js";
import { validObject } from "../../utilities/validations.js";

export const getContacts = async (request, response) => {
  const contactsQuery = await Contact.find().sort({ date: -1 });
  const userQuery = await User.findOne();
  const queries = [contactsQuery, userQuery];
	const results = await Promise.all(queries);
  const user = results[1];
  if (validObject(user)) return response.status(200).json({ contacts: results[0], user: { firstName: user.firstName, lastName: user.lastName } }).end();
  else return response.status(400).send(false).end();
};

export const saveContact = async (request, response) => {
	const { name, email, subject, message, isGerman } = request.body;
  const isAnswered = false;
	const date = new Date().getTime();
	const newContact = new Contact({ name, email, subject, message, isGerman, isAnswered, date });
	const contact = await newContact.save();
  const user = await User.findOne();
  if (validObject(user)) {
    const { email, firstName, lastName } = user;
    await sendEmails(email, firstName, lastName, contact);
    return response.status(200).send(true).end();
  } else {
    return response.status(400).send(false).end();
  }
};

export const answerContact = async (request, response) => {
  const { contactId } = request.params;
	const { isAnswered } = request.body;
	const update = { isAnswered };
	const options = { new: true };
	await Contact.findByIdAndUpdate(contactId, update, options);
	return response.status(200).send(isAnswered).end();
};

export const deleteContact = async (request, response) => {
	const { contactId } = request.params;
	await Contact.findByIdAndDelete(contactId);
	return response.status(200).send(true).end();
};
