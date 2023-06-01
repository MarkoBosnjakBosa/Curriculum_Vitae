import User from "../models/user.js";
import Contact from "../models/contact.js";
import { sendEmails } from "../utilities/emails.js";
import { select } from "../utilities/scripts.js";
import { isEmpty } from "../utilities/validations.js";
import constants from "../utilities/constants.js";

export const contacts = async (request, response) => {
	const { userId } = request.session;
  const page = 1;
	const limit = 10;
	const sort = { date: -1 };
	const contactsQuery = Contact.find().sort(sort).limit(limit);
	const totalQuery = Contact.find().countDocuments();
	const userQuery = User.findById(userId);
	const queries = [contactsQuery, totalQuery, userQuery];
	const results = await Promise.all(queries);
	const total = results[1];
	let pagesNumber = 1;
	if (total >= limit) pagesNumber = Math.ceil(total / limit);
  const user = results[2];
  user.password = null;
	return response.render("contacts.html", { baseUrl: process.env.BASE_URL, contacts: results[0], total, pagesNumber, page, user });
};

export const getContacts = async (request, response) => {
  const { userId } = request.session;
	const { search, orderBy } = request.body;
	const page = Number(request.body.page) - 1;
	const limit = Number(request.body.limit) ? Number(request.body.limit) : 1;
	const skip = page * limit;
	const { query, sort } = select(search, orderBy);
	const contactsQuery = Contact.find(query).sort(sort).skip(skip).limit(limit);
	const totalQuery = Contact.find(query).countDocuments();
  const userQuery = User.findById(userId);
	const queries = [contactsQuery, totalQuery, userQuery];
	const results = await Promise.all(queries);
	const total = results[1];
	let pagesNumber = 1;
	if (total >= limit) pagesNumber = Math.ceil(total / limit);
  const user = results[2];
  user.password = null;
	return response.status(200).json({ contacts: results[0], total, pagesNumber, user }).end();
};

export const saveContact = async (request, response) => {
	const { name, email, subject, message, language } = request.body;
  const isGerman = language === constants.GERMAN_LANGUAGE;
  const isAnswered = false;
	const date = new Date().getTime();
	const newContact = new Contact({ name, email, subject, message, isGerman, isAnswered, date });
	const contact = await newContact.save();
  const user = await User.findOne();
  if (!isEmpty(user)) {
    const { firstName, lastName } = user;
    sendEmails(user.email, firstName, lastName, contact);
    return response.status(200).send(true).end();
  } else {
    return response.status(400).send(false).end();
  }
};

export const answerContact = async (request, response) => {
	const { contactId, isAnswered } = request.body;
	const update = { isAnswered };
	const options = { new: true };
	const contact = await Contact.findByIdAndUpdate(contactId, update, options);
	if (!isEmpty(contact)) {
		return response.status(200).send(isAnswered).end();
	} else {
		return response.status(400).json({ errors: "The provided contact does not exist!" }).end();
	}
};

export const deleteContact = async (request, response) => {
	const { contactId } = request.params;
	const contact = await Contact.findByIdAndDelete(contactId);
	if (!isEmpty(contact)) {
		return response.status(200).send(true).end();
	} else {
		return response.status(400).json({ errors: "The provided contact does not exist!" }).end();
	}
};
