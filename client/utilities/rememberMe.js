export const remember = (username) => {
  const rememberMe = { rememberMe: { username } };
  localStorage.setItem("rememberMe", JSON.stringify(rememberMe));
};

export const forget = () => localStorage.removeItem("rememberMe");

export const get = () => {
  try {
    const foundData = localStorage.getItem("rememberMe");
    const data = JSON.parse(foundData);
    const { rememberMe } = data;
    return rememberMe;
  } catch (error) {
    return { username: null };
  }
};
