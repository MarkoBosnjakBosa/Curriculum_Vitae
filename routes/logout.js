export const logout = (request, response) => {
  request.session.destroy(() => {
    return response.status(200).send(`${process.env.BASE_URL}/login`).end();
  });
};
