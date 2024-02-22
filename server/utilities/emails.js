import ejs from "ejs";
import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";

export const sendEmails = (email, firstName, lastName, contact) => {
  sendAdministratorEmail(email, firstName, lastName, contact);
  sendContactEmail(firstName, lastName, contact);
};

const sendAdministratorEmail = async (email, firstName, lastName, contact) => {
  const compiledHtml = ejs.compile(fs.readFileSync(path.resolve("./server/templates/administrator.html"), { encoding: "UTF-8" }));
  const html = compiledHtml({ firstName, lastName, contact });
  await sendEmail(email, "New inquiry", html);
};

const sendContactEmail = async (firstName, lastName, contact) => {
  const compiledHtml = ejs.compile(fs.readFileSync(path.resolve("./server/templates/contact.html"), { encoding: "UTF-8" }));
  const html = compiledHtml({ firstName, lastName, contact });
  await sendEmail(contact.email, `${firstName} ${lastName} - ${contact.isGerman ? "Nachricht erhalten" : "Message received"}`, html);
};

const sendEmail = async (email, subject, html) => {
  const options = { from: process.env.EMAIL_USERNAME, to: email, subject, html };
  const transporter = nodemailer.createTransport({ service: process.env.EMAIL_SERVICE, auth: { user: process.env.EMAIL_USERNAME, pass: process.env.EMAIL_PASSWORD } });
  transporter.sendMail(options);
};
