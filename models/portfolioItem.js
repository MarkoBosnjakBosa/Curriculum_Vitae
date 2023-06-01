import * as mongoose from "mongoose";

const portfolioItemScheme = new mongoose.Schema({
  title: { type: String, required: true },
  link: { type: String, required: true },
  type: { type: String, required: true },
  logo: { name: String, mimeType: String, buffer: Buffer }
});

const PortfolioItem = mongoose.model("PortfolioItem", portfolioItemScheme);

export default PortfolioItem;
