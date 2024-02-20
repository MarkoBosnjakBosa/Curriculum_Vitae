import { useLoaderData } from "react-router-dom";
import { getData } from "../utilities/api";
import { get } from "../utilities/language";
import { getString } from "../utilities/i18n";
import { validProfile, validArray } from "../../utilities/validations";
import About from "../components/about/About";
import MessageLayout from "../components/layouts/MessageLayout";

const AboutPage = () => {
  const data = useLoaderData();
  const { user, skills, workPortfolio, personalPortfolio, academicPortfolio, experienceResume, educationResume, certifications, customers } = data;
  const { isGerman } = get();

  return (
    (validProfile(user) && validArray(skills) && validArray(workPortfolio) && validArray(personalPortfolio) && validArray(academicPortfolio) && validArray(experienceResume) && validArray(educationResume) && validArray(certifications) && validArray(customers)) ? (
      <About data={data} />
    ) : (
      <MessageLayout message={getString("cv.texts.page.not.available")} isGerman={isGerman} isAlone />
    )
  );
};

export default AboutPage;

export const loader = async () => await getData(`${window.location.origin}/getAbout`);
