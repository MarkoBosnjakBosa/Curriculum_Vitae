import { useState } from "react";
import { validText } from "../../../utilities/validations";
import constants from "../../../utilities/constants";
import NewResumeItem from "./NewResumeItem";
import ResumeTable from "./ResumeTable";
import NotificationLayout from "../layouts/NotificationLayout";
import style from "../../App.module.css";
import { Button } from "@mui/material";
import { East, West } from "@mui/icons-material";

const Resume = (props) => {
  const [experienceResume, setExperienceResume] = useState(props.experienceResume);
  const [educationResume, setEducationResume] = useState(props.educationResume);
  const [step, setStep] = useState(0);
  const [message, setMessage] = useState("");

  const completeCreation = (newResumeItem, isDisplayed = null) => {
    if (newResumeItem.type === constants.EXPERIENCE_RESUME) {
      setExperienceResume((previousExperienceResume) => [...previousExperienceResume, newResumeItem]);
      setStep(0);
    } else {
      setEducationResume((previousEducationResume) => [...previousEducationResume, newResumeItem]);
      setStep(1);
    }
    if (isDisplayed) displayMessage(newResumeItem.title, constants.CREATED_ACTION);
  };

  const completeEdit = (editedResumeItem, oldType) => {
    if (editedResumeItem.type === oldType) {
      if (editedResumeItem.type === constants.EXPERIENCE_RESUME) setExperienceResume((previousExperienceResume) => previousExperienceResume.map((experienceResumeItem) => (experienceResumeItem._id === editedResumeItem._id) ? editedResumeItem : experienceResumeItem));
      else setEducationResume((previousEducationResume) => previousEducationResume.map((educatioResumeItem) => (educatioResumeItem._id === editedResumeItem._id) ? editedResumeItem : educatioResumeItem));
    } else {
      completeDeletion(editedResumeItem._id, oldType);
      completeCreation(editedResumeItem);
    }
    displayMessage(editedResumeItem.title, constants.EDITED_ACTION);
  };

  const completeDeletion = (resumeItemId, type, title = null) => {
    if (type === constants.EXPERIENCE_RESUME) setExperienceResume((previousExperienceResume) => previousExperienceResume.filter((experienceResumeItem) => experienceResumeItem._id !== resumeItemId));
    else setEducationResume((previousEducationResume) => previousEducationResume.filter((educationResumeItem) => educationResumeItem._id !== resumeItemId));
    if (validText(title)) displayMessage(title, constants.DELETED_ACTION);
  };

  const displayMessage = (title, action) => setMessage(`Resume item ${title} has been successfully ${action}!`);

  return (
    <>
      <h1 className={style.center}>Resume</h1>
      <NewResumeItem onCompleteCreation={completeCreation} />
      {(step === 0) ? (
        <>
          <ResumeTable resume={experienceResume} type={constants.EXPERIENCE_RESUME} onCompleteEdit={completeEdit} onCompleteDeletion={completeDeletion} />
          <div className={`${style.auto} ${style.alignRight} ${style.marginTop} ${style.marginBottom} ${style.bigContent}`}>
            <Button type="button" variant="contained" onClick={() => setStep(1)}><East /></Button>
          </div>
        </>
      ) : (
        <>
          <ResumeTable resume={educationResume} type={constants.EDUCATION_RESUME} onCompleteEdit={completeEdit} onCompleteDeletion={completeDeletion} />
          <div className={`${style.auto} ${style.marginTop} ${style.marginBottom} ${style.bigContent}`}>
            <Button type="button" variant="contained" onClick={() => setStep(0)}><West /></Button>
          </div>
        </>
      )}
      {validText(message) && (
        <NotificationLayout onClose={() => setMessage("")}>{message}</NotificationLayout>
      )}
    </>
  );
};

export default Resume;
