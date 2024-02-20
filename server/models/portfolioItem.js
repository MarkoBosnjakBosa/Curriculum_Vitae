import mongoose from "mongoose";

const portfolioItem = new mongoose.Schema({
  title: { type: String, required: true },
  link: { type: String, required: true },
  type: { type: String, required: true },
  logo: { name: String, mimeType: String, data: String }
});

export default mongoose.model("PortfolioItem", portfolioItem);
