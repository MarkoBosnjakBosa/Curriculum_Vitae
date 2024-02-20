import PortfolioItem from "../models/portfolioItem.js";
import constants from "../../utilities/constants.js";

export const getPortfolio = async (request, response) => {
  const portfolio = await PortfolioItem.find();
  const workPortfolio = portfolio.filter((portfolioItem) => portfolioItem.type === constants.WORK_PORTFOLIO);
  const personalPortfolio = portfolio.filter((portfolioItem) => portfolioItem.type === constants.PERSONAL_PORTFOLIO);
  const academicPortfolio = portfolio.filter((portfolioItem) => portfolioItem.type === constants.ACADEMIC_PORTFOLIO);
  return response.status(200).json({ workPortfolio, personalPortfolio, academicPortfolio }).end();
};

export const getPortfolioItem = async (request, response) => {
  const { portfolioItemId } = request.params;
  const portfolioItem = await PortfolioItem.findById(portfolioItemId);
  return response.status(200).json(portfolioItem).end();
};

export const createPortfolioItem = async (request, response) => {
  const { title, link, type, logo } = request.body;
  const newPortfolioItem = new PortfolioItem({ title, link, type, logo });
  const portfolioItem = await newPortfolioItem.save();
  return response.status(200).json(portfolioItem).end();
};

export const editPortfolioItem = async (request, response) => {
  const { portfolioItemId } = request.params;
  const { title, link, type, logo } = request.body;
  const update = { title, link, type, logo };
  const options = { new: true };
  const portfolioItem = await PortfolioItem.findByIdAndUpdate(portfolioItemId, update, options);
  return response.status(200).json(portfolioItem).end();
};

export const deletePortfolioItem = async (request, response) => {
  const { portfolioItemId } = request.params;
  await PortfolioItem.findByIdAndDelete(portfolioItemId);
  return response.status(200).send(true).end();
};
