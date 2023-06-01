import express from "express";
import session from "express-session";
import cors from "cors";
import * as dotenv from "dotenv";
import path from "path";
import * as mongoose from "mongoose";
import ejs from "ejs";
import memorystore from "memorystore";
const MemoryStore = memorystore(session);

import { createAdministrator } from "./utilities/administration.js";
import { about } from "./routes/about.js";
import { login, checkUsername, loginUser } from "./routes/login.js";
import { overview } from "./routes/overview.js";
import { profile, editProfile, editAvatar } from "./routes/profile.js";
import { password, resetPassword } from "./routes/password.js";
import { skills, getSkill, createSkill, editSkill, deleteSkill } from "./routes/skills.js";
import { portfolio, getPortfolioItem, createPortfolioItem, editPortfolioItem, deletePortfolioItem } from "./routes/portfolio.js";
import { resume, getResumeItem, createResumeItem, editResumeItem, deleteResumeItem } from "./routes/resume.js";
import { downloads } from "./routes/downloads.js";
import { contacts, getContacts, saveContact, answerContact, deleteContact } from "./routes/contacts.js";
import { logout } from "./routes/logout.js";
import { pageNotFound } from "./routes/pageNotFound.js";
import { isLoggedIn } from "./middleware/checkAuthentication.js";
import { hasPermission } from "./middleware/checkAuthorization.js";
import validations from "./middleware/validations.js";

const app = express();
dotenv.config();
const directory = path.resolve();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(session({ secret: process.env.SESSION_SECRET, saveUninitialized: true, resave: false, cookie: { maxAge: 86400000 }, store: new MemoryStore({ checkPeriod: 86400000 }) }));
app.use("/handlers", express.static("handlers/"));
app.use("/utilities", express.static("utilities/"));
app.use("/style", express.static("style/"));
app.use("/images", express.static("images/"));
app.use("/custom", express.static("custom/"));
app.use("/public", express.static("public/"));
app.use("/stylesheets/fontawesome", express.static(`${directory}/node_modules/@fortawesome/fontawesome-free/`));
app.use("/css", express.static(`${directory}/node_modules/bootstrap/dist/css/`));
app.use("/popper", express.static(`${directory}/node_modules/@popperjs/core/dist/umd/`));
app.use("/js", express.static(`${directory}/node_modules/bootstrap/dist/js/`));
app.use("/jquery", express.static(`${directory}/node_modules/jquery/dist/`));
app.set("views", `${directory}/views/`);
app.engine("html", ejs.renderFile);
app.set("view engine", "html");

app.get("/", about);
app.get("/about/:language*?", about);
app.get("/login", login);
app.post("/loginUser", [validations.validateLogin], loginUser);
app.post("/checkUsername", [validations.validateUsernameCheck], checkUsername);
app.get("/overview", [isLoggedIn], overview);
app.get("/profile", [isLoggedIn], profile);
app.put("/editProfile", [hasPermission, validations.validateProfile], editProfile);
app.put("/editAvatar", [hasPermission], editAvatar);
app.get("/password", [isLoggedIn], password);
app.put("/resetPassword", [hasPermission, validations.validatePasswordReset], resetPassword);
app.get("/skills", [isLoggedIn], skills);
app.get("/getSkill/:skillId", [hasPermission, validations.validateObjectId], getSkill);
app.post("/createSkill", [hasPermission, validations.validateSkill], createSkill);
app.put("/editSkill", [hasPermission, validations.validateSkill], editSkill);
app.delete("/deleteSkill/:skillId", [hasPermission, validations.validateObjectId], deleteSkill);
app.get("/portfolio", [isLoggedIn], portfolio);
app.get("/getPortfolioItem/:portfolioItemId", [hasPermission, validations.validateObjectId], getPortfolioItem);
app.post("/createPortfolioItem", [hasPermission], createPortfolioItem);
app.put("/editPortfolioItem", [hasPermission], editPortfolioItem);
app.delete("/deletePortfolioItem/:portfolioItemId", [hasPermission, validations.validateObjectId], deletePortfolioItem);
app.get("/resume", [isLoggedIn], resume);
app.get("/getResumeItem/:resumeItemId", [hasPermission, validations.validateObjectId], getResumeItem);
app.post("/createResumeItem", [hasPermission, validations.validateResumeItem], createResumeItem);
app.put("/editResumeItem", [hasPermission, validations.validateResumeItem], editResumeItem);
app.delete("/deleteResumeItem/:resumeItemId", [hasPermission, validations.validateObjectId], deleteResumeItem);
app.get("/downloads", [isLoggedIn], downloads);
app.get("/contacts", [isLoggedIn], contacts);
app.post("/getContacts", [hasPermission], getContacts);
app.post("/saveContact", [validations.validateContact], saveContact);
app.put("/answerContact", [hasPermission, validations.validateObjectId], answerContact);
app.delete("/deleteContact/:contactId", [hasPermission, validations.validateObjectId], deleteContact);
app.get("/logout", [hasPermission], logout);
app.get("/*", pageNotFound);

mongoose.connect(process.env.DATABASE_URL)
  .then(() => {
    createAdministrator();
  })
  .catch((error) => {
    console.log("Connection to the database could not be established!");
    console.log(error);
  });

app.listen(process.env.PORT || process.env.BASE_URL.split(":")[2], () => {
  console.log(`Curriculum Vitae listening on ${process.env.BASE_URL}!`);
});
