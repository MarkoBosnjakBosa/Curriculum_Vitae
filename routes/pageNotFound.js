export const pageNotFound = (request, response) => {
  return response.render("pageNotFound.html", { baseUrl: process.env.BASE_URL });
};
