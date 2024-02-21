import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";

import { createAdministrator } from "./server/utilities/administration.js";
import { client } from "./server/routes/client.js";
import { getAbout } from "./server/routes/about.js";
import { checkAuthentication } from "./server/routes/checkAuthentication.js";
import { login, authenticate } from "./server/routes/login.js";
import { getProfile, editProfile, editAvatar, editPassword, getSecret, setAuthentication } from "./server/routes/profile.js";
import { getSkills, getSkill, createSkill, editSkill, deleteSkill } from "./server/routes/skills.js";
import { getPortfolio, getPortfolioItem, createPortfolioItem, editPortfolioItem, deletePortfolioItem } from "./server/routes/portfolio.js";
import { getResume, getResumeItem, createResumeItem, editResumeItem, deleteResumeItem } from "./server/routes/resume.js";
import { getReferences, getReference, createReference, editReference, deleteReference } from "./server/routes/references.js";
import { getContacts, saveContact, answerContact, deleteContact } from "./server/routes/contacts.js";
import { isLoggedIn } from "./server/middleware/checkAuthentication.js";
import validations from "./server/middleware/validations.js";

const app = express();
dotenv.config();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.static(path.resolve("./bundle")));

app.get("/getAbout", getAbout);
app.get("/checkAuthentication", [isLoggedIn], checkAuthentication);
app.post("/login", [validations.validateLogin], login);
app.post("/authenticate/:userId", [validations.validateAuthentication], authenticate);
app.get("/getProfile/:userId", [isLoggedIn, validations.validateProfile], getProfile);
app.put("/editProfile/:userId", [isLoggedIn, validations.validateProfile], editProfile);
app.put("/editAvatar/:userId", [isLoggedIn, validations.validateAvatar], editAvatar);
app.put("/editPassword/:userId", [isLoggedIn, validations.validatePassword], editPassword);
app.get("/getSecret/:userId", [isLoggedIn, validations.validateAuthentication], getSecret);
app.put("/setAuthentication/:userId", [isLoggedIn, validations.validateAuthentication], setAuthentication);
app.get("/getSkills", [isLoggedIn], getSkills);
app.get("/getSkill/:skillId", [isLoggedIn, validations.validateSkill], getSkill);
app.post("/createSkill", [isLoggedIn, validations.validateNewSkill], createSkill);
app.put("/editSkill/:skillId", [isLoggedIn, validations.validateSkill], editSkill);
app.delete("/deleteSkill/:skillId", [isLoggedIn, validations.validateSkill], deleteSkill);
app.get("/getPortfolio", [isLoggedIn], getPortfolio);
app.get("/getPortfolioItem/:portfolioItemId", [isLoggedIn, validations.validatePortfolioItem], getPortfolioItem);
app.post("/createPortfolioItem", [isLoggedIn, validations.validateNewPortfolioItem], createPortfolioItem);
app.put("/editPortfolioItem/:portfolioItemId", [isLoggedIn, validations.validatePortfolioItem], editPortfolioItem);
app.delete("/deletePortfolioItem/:portfolioItemId", [isLoggedIn, validations.validatePortfolioItem], deletePortfolioItem);
app.get("/getResume", [isLoggedIn], getResume);
app.get("/getResumeItem/:resumeItemId", [isLoggedIn, validations.validateResumeItem], getResumeItem);
app.post("/createResumeItem", [isLoggedIn, validations.validateNewResumeItem], createResumeItem);
app.put("/editResumeItem/:resumeItemId", [isLoggedIn, validations.validateResumeItem], editResumeItem);
app.delete("/deleteResumeItem/:resumeItemId", [isLoggedIn, validations.validateResumeItem], deleteResumeItem);
app.get("/getReferences", [isLoggedIn], getReferences);
app.get("/getReference/:referenceId", [isLoggedIn, validations.validateReference], getReference);
app.post("/createReference", [isLoggedIn, validations.validateNewReference], createReference);
app.put("/editReference/:referenceId", [isLoggedIn, validations.validateReference], editReference);
app.delete("/deleteReference/:referenceId", [isLoggedIn, validations.validateReference], deleteReference);
app.get("/getContacts", [isLoggedIn], getContacts);
app.post("/saveContact", [validations.validateNewContact], saveContact);
app.put("/answerContact/:contactId", [isLoggedIn, validations.validateContact], answerContact);
app.delete("/deleteContact/:contactId", [isLoggedIn, validations.validateContact], deleteContact);
app.get("*", client);

mongoose.connect(process.env.DATABASE_URL)
  .then(() => createAdministrator())
  .catch((error) => {
    console.log("Connection to the database could not be established!");
    console.log(error);
  });

app.listen(process.env.PORT || process.env.BASE_URL.split(":")[2], () => {
  console.log(`Curriculum Vitae listening on ${process.env.BASE_URL}!`);
});
