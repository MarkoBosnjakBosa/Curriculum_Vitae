import { useRef } from "react";
import constants from "../../../utilities/constants";
import Header from "./Header";
import Profile from "./Profile";
import Skills from "./Skills";
import Portfolio from "./Portfolio";
import Resume from "./Resume";
import References from "./References";
import Contact from "./Contact";
import ActionLayout from "../layouts/ActionLayout";
import TitleLayout from "../layouts/TitleLayout";
import style from "../../App.module.css";

const About = (props) => {
  const { data } = props;
  const { user, skills, workPortfolio, personalPortfolio, academicPortfolio, experienceResume, educationResume, certifications, customers } = data;
  const sections = constants.ABOUT_SECTIONS;
  const profileRef = useRef(null);
  const skillsRef = useRef(null);
  const portfolioRef = useRef(null);
  const experienceRef = useRef(null);
  const educationRef = useRef(null);
  const certificationsRef = useRef(null);
  const customersRef = useRef(null);
  const contactRef = useRef(null);

  const scroll = (section) => {
    let ref;
    switch (section) {
      case sections[0]: 
        ref = profileRef;
        break;
      case sections[1]:
        ref = skillsRef;
        break;
      case sections[2]:
        ref = portfolioRef;
        break;
      case sections[3]:
        ref = experienceRef;
        break;
      case sections[4]:
        ref = educationRef;
        break;
      case sections[5]:
        ref = certificationsRef;
        break;
      case sections[6]:
        ref = customersRef;
        break;
      case sections[7]:
        ref = contactRef;
        break;
    }
    if (ref) ref.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Header onScroll={scroll} />
      <Profile ref={profileRef} user={user} skills={skills} experienceResume={experienceResume} educationResume={educationResume} certifications={certifications} onScroll={scroll} />
      <Skills ref={skillsRef} skills={skills} />
      <Portfolio ref={portfolioRef} workPortfolio={workPortfolio} personalPortfolio={personalPortfolio} academicPortfolio={academicPortfolio} />
      <Resume ref={{ experienceRef, educationRef }} experienceResume={experienceResume} educationResume={educationResume} />
      <References ref={{ certificationsRef, customersRef }} certifications={certifications} customers={customers} />
      <Contact ref={contactRef} user={user} />
      <div className={`${style.center} ${style.sectionMarginTop}`}>
        <ActionLayout icon="fab fa-linkedin-in" value={user.linkedIn} />
        <ActionLayout icon="fab fa-xing" value={user.xing} />
        <ActionLayout icon="fab fa-github" value={user.gitHub} />
        <ActionLayout icon="fab fa-yahoo" value={user.email} />
      </div>
      <TitleLayout title={`${user.firstName} ${user.lastName}`} customization={`${style.marginTop} ${style.marginBottom}`} />
    </>
  );
};

export default About;
