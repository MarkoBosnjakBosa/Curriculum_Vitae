export const set = (isGerman) => {
  const language = { language: { isGerman } };
  localStorage.setItem("language", JSON.stringify(language));
  window.location.reload();
};

export const get = () => {
  try {
    const foundData = localStorage.getItem("language");
    const data = JSON.parse(foundData);
    const { language } = data;
    return language;
  } catch (error) {
    return { isGerman: false };
  }
};
