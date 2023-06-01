import * as fs from "fs";
import path from "path";
const directory = path.resolve();

export const downloads = (request, response) => {
  const baseUrl = process.env.BASE_URL;
  const cvEnglishName = "Marko_Bošnjak_Curriculum_Vitae.pdf";
  const cvGermanName = "Marko_Bošnjak_Lebenslauf.pdf";
  const cvEnglishFile = `${directory}/custom/${cvEnglishName}`;
  const cvGermanFile = `${directory}/custom/${cvGermanName}`;
  if (fs.existsSync(cvEnglishFile) && fs.existsSync(cvGermanFile)) {
    return response.render("downloads.html", { baseUrl, exist: true, cvEnglishName, cvGermanName });
  } else {
    return response.render("downloads.html", { baseUrl, exist: false });
  }
};
