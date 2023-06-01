import * as fs from "fs";
import path from "path";
import formidable from "formidable";
import PortfolioItem from "../models/portfolioItem.js";
import { createImageObject } from "../utilities/scripts.js";
import { validText, validLink, validType, validObjectId, isEmpty } from "../utilities/validations.js";
import constants from "../utilities/constants.js";
const directory = path.resolve();

export const portfolio = async (request, response) => {
  const portfolio = await PortfolioItem.find();
  const workPortfolio = portfolio.filter((portfolioItem) => portfolioItem.type === constants.WORK_PORTFOLIO);
  const personalPortfolio = portfolio.filter((portfolioItem) => portfolioItem.type === constants.PERSONAL_PORTFOLIO);
  const academicPortfolio = portfolio.filter((portfolioItem) => portfolioItem.type === constants.ACADEMIC_PORTFOLIO);
  return response.render("portfolio.html", { baseUrl: process.env.BASE_URL, workPortfolio, personalPortfolio, academicPortfolio });
};

export const getPortfolioItem = async (request, response) => {
  const { portfolioItemId } = request.params;
  const portfolioItem = await PortfolioItem.findById(portfolioItemId);
  if (!isEmpty(portfolioItem)) {
    return response.status(200).json(portfolioItem).end();
  } else {
    return response.status(400).json({ errors: "The provided portfolio item does not exist!" }).end();
  }
};

export const createPortfolioItem = async (request, response) => {
  const form = new formidable.IncomingForm({ uploadDir: `${directory}/temporary` });
  form.parse(request, async (error, fields, files) => {
    let errors = [];
    const title = fields.title;
    if (!validText(title)) {
      errors = [...errors, "title"];
    }
    const link = fields.link;
    if (!validLink(link)) {
      errors = [...errors, "link"];
    }
    const type = fields.type;
    if (!validType(type, constants.PORTFOLIO_ITEM)) {
      errors = [...errors, "type"];
    }
    const logo = files.logo;
    if (isEmpty(logo) || (!isEmpty(logo) && !logo.mimetype.match("image.*"))) {
      errors = [...errors, "logo"];
    }
    if (!errors.length) {
      const logoObject = createImageObject(logo, fs.readFileSync(logo.filepath));
      const newPortfolioItem = new PortfolioItem({ title, link, type, logo: logoObject });
      const portfolioItem = await newPortfolioItem.save();
      fs.unlinkSync(logo.filepath);
      const newLogo = `data:${portfolioItem.logo.mimeType};base64,${(new Buffer.from(portfolioItem.logo.buffer)).toString("base64")}`;
      return response.status(200).json({ portfolioItem, newLogo, isCreated: true }).end();
    }
    return response.status(400).json({ errors }).end();
  });
};

export const editPortfolioItem = async (request, response) => {
  const form = new formidable.IncomingForm({ uploadDir: `${directory}/temporary` });
  form.parse(request, async (error, fields, files) => {
    let errors = [];
    const portfolioItemId = fields.portfolioItemId;
    const title = fields.title;
    if (!validObjectId(portfolioItemId) || !validText(title)) {
      errors = [...errors, "title"];
    }
    const link = fields.link;
    if (!validLink(link)) {
      errors = [...errors, "link"];
    }
    const type = fields.type;
    if (!validType(type, constants.PORTFOLIO_ITEM)) {
      errors = [...errors, "type"];
    }
    const logo = files.logo;
    if (!errors.length) {
      const update = { title, link, type };
      if (logo && logo.mimetype.match("image.*")) {
        const logoObject = createImageObject(logo, fs.readFileSync(logo.filepath));
        update.logo = logoObject;
        fs.unlinkSync(logo.filepath);
      }
      const options = { new: true };
      const portfolioItem = await PortfolioItem.findByIdAndUpdate(portfolioItemId, update, options);
      if (!isEmpty(portfolioItem)) {
        const newLogo = `data:${portfolioItem.logo.mimeType};base64,${(new Buffer.from(portfolioItem.logo.buffer)).toString("base64")}`;
        return response.status(200).json({ portfolioItem, newLogo, isCreated: false }).end();
      } else {
        return response.status(400).json({ errors: "The provided portfolio item does not exist!" }).end();
      }
    }
    return response.status(400).json({ errors }).end();
  });
};

export const deletePortfolioItem = async (request, response) => {
  const { portfolioItemId } = request.params;
  const portfolioItem = await PortfolioItem.findByIdAndDelete(portfolioItemId);
  if (!isEmpty(portfolioItem)) {
    return response.status(200).send(true).end();
  } else {
    return response.status(400).json({ errors: "The provided portfolio item does not exist!" }).end();
  }
};
