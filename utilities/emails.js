import ejs from "ejs";
import * as fs from "fs";
import path from "path";
import nodemailer from "nodemailer";
const directory = path.resolve();

export const sendEmails = (email, firstName, lastName, contact) => {
  sendAdministratorEmail(email, firstName, contact);
  sendContactEmail(firstName, lastName, contact);
};

const sendAdministratorEmail = (email, firstName, contact) => {
  const compiledHtml = ejs.compile(fs.readFileSync(`${directory}/templates/administrator.html`, "UTF-8"));
  const html = compiledHtml({ firstName, contact });
  sendEmail(email, "New inquiry", html);
};

const sendContactEmail = (firstName, lastName, contact) => {
  const compiledHtml = ejs.compile(fs.readFileSync(`${directory}/templates/contact.html`, "UTF-8"));
  const html = compiledHtml({ firstName, lastName, contact });
  sendEmail(contact.email, `${firstName} ${lastName} - ${contact.isGerman ? "Nachricht erhalten" : "Message received"}`, html);
};

const sendEmail = (email, subject, html) => {
  const options = { from: process.env.EMAIL_USERNAME, to: email, subject, html };
  const transporter = nodemailer.createTransport({ service: process.env.EMAIL_SERVICE, auth: { user: process.env.EMAIL_USERNAME, pass: process.env.EMAIL_PASSWORD } });
  transporter.sendMail(options);
};
