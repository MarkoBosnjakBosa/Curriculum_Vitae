import { forwardRef } from "react";
import { getString } from "../../utilities/i18n";
import TitleLayout from "../layouts/TitleLayout";
import DataLayout from "../layouts/DataLayout";
import style from "../../App.module.css";

const Resume = forwardRef((props, ref) => {
  const { experienceResume, educationResume } = props;
  const { experienceRef, educationRef } = ref;

  return (
    <>
      <TitleLayout ref={experienceRef} title={getString("cv.sections.experience")} customization={style.sectionMarginTop} />
      <DataLayout resume={experienceResume} />
      <TitleLayout ref={educationRef} title={getString("cv.sections.education")} customization={style.sectionMarginTop} />
      <DataLayout resume={educationResume} />
    </>
  );
});

export default Resume;
