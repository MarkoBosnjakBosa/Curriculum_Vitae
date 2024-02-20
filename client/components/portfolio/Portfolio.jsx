import { useState } from "react";
import { validText } from "../../../utilities/validations";
import constants from "../../../utilities/constants";
import NewPortfolioItem from "./NewPortfolioItem";
import PortfolioTable from "./PortfolioTable";
import NotificationLayout from "../layouts/NotificationLayout";
import defaultStyle from "../../App.module.css";
import { Button } from "@mui/material";
import { East, West } from "@mui/icons-material";

const Portfolio = (props) => {
  const [workPortfolio, setWorkPortfolio] = useState(props.workPortfolio);
  const [personalPortfolio, setPersonalPortfolio] = useState(props.personalPortfolio);
  const [academicPortfolio, setAcademicPortfolio] = useState(props.academicPortfolio);
  const [step, setStep] = useState(0);
  const [message, setMessage] = useState("");

  const completeCreation = (newPortfolioItem, isDisplayed = null) => {
    if (newPortfolioItem.type === constants.WORK_PORTFOLIO) {
      setWorkPortfolio((previousWorkPortfolio) => [...previousWorkPortfolio, newPortfolioItem]);
      setStep(0);
    } else if (newPortfolioItem.type === constants.PERSONAL_PORTFOLIO) {
      setPersonalPortfolio((previousPersonalPortfolio) => [...previousPersonalPortfolio, newPortfolioItem]);
      setStep(1);
    } else {
      setAcademicPortfolio((previousAcademicPortfolio) => [...previousAcademicPortfolio, newPortfolioItem]);
      setStep(2);
    }
    if (isDisplayed) displayMessage(newPortfolioItem.title, constants.CREATED_ACTION);
  };

  const completeEdit = (editedPortfolioItem, oldType) => {
    if (editedPortfolioItem.type === oldType) {
      if (editedPortfolioItem.type === constants.WORK_PORTFOLIO) setWorkPortfolio((previousWorkPortfolio) => previousWorkPortfolio.map((workPortfolioItem) => (workPortfolioItem._id === editedPortfolioItem._id) ? editedPortfolioItem : workPortfolioItem));
      else if (editedPortfolioItem.type === constants.PERSONAL_PORTFOLIO) setPersonalPortfolio((previousPersonalPortfolio) => previousPersonalPortfolio.map((personalPortfolioItem) => (personalPortfolioItem._id === editedPortfolioItem._id) ? editedPortfolioItem : personalPortfolioItem));
      else setAcademicPortfolio((previousAcademicPortfolio) => previousAcademicPortfolio.map((academicPortfolioItem) => (academicPortfolioItem._id === editedPortfolioItem._id) ? editedPortfolioItem : academicPortfolioItem));
    } else {
      completeDeletion(editedPortfolioItem._id, oldType);
      completeCreation(editedPortfolioItem);
    }
    displayMessage(editedPortfolioItem.title, constants.EDITED_ACTION);
  };

  const completeDeletion = (portfolioItemId, type, title = null) => {
    if (type === constants.WORK_PORTFOLIO) setWorkPortfolio((previousWorkPortfolio) => previousWorkPortfolio.filter((workPortfolioItem) => workPortfolioItem._id !== portfolioItemId));
    else if (type === constants.PERSONAL_PORTFOLIO) setPersonalPortfolio((previousPersonalPortfolio) => previousPersonalPortfolio.filter((personalPortfolioItem) => personalPortfolioItem._id !== portfolioItemId));
    else setAcademicPortfolio((previousAcademicPortfolio) => previousAcademicPortfolio.filter((academicPortfolioItem) => academicPortfolioItem._id !== portfolioItemId));
    if (validText(title)) displayMessage(title, constants.DELETED_ACTION);
  };

  const displayMessage = (title, action) => setMessage(`Portfolio item ${title} has been successfully ${action}!`);

  return (
    <>
      <h1 className={defaultStyle.center}>Portfolio</h1>
      <NewPortfolioItem onCompleteCreation={completeCreation} />
      {(step === 0) ? (
        <>
          <PortfolioTable portfolio={workPortfolio} type={constants.WORK_PORTFOLIO} onCompleteEdit={completeEdit} onCompleteDeletion={completeDeletion} />
          <div className={`${defaultStyle.auto} ${defaultStyle.alignRight} ${defaultStyle.marginTop} ${defaultStyle.marginBottom} ${defaultStyle.bigContent}`}>
            <Button type="button" variant="contained" onClick={() => setStep(1)}><East /></Button>
          </div>
        </>
      ) : (step === 1) ? (
        <>
          <PortfolioTable portfolio={personalPortfolio} type={constants.PERSONAL_PORTFOLIO} onCompleteEdit={completeEdit} onCompleteDeletion={completeDeletion} />
          <div className={`${defaultStyle.auto} ${defaultStyle.marginTop} ${defaultStyle.marginBottom} ${defaultStyle.bigContent}`}>
            <Button type="button" variant="contained" onClick={() => setStep(0)}><West /></Button>
            <Button type="button" variant="contained" className={defaultStyle.floatRight} onClick={() => setStep(2)}><East /></Button>
          </div>
        </>
      ) : (
        <>
          <PortfolioTable portfolio={academicPortfolio} type={constants.ACADEMIC_PORTFOLIO} onCompleteEdit={completeEdit} onCompleteDeletion={completeDeletion} />
          <div className={`${defaultStyle.auto} ${defaultStyle.marginTop} ${defaultStyle.marginBottom} ${defaultStyle.bigContent}`}>
            <Button type="button" variant="contained" onClick={() => setStep(1)}><West /></Button>
          </div>
        </>
      )}
      {validText(message) && (
        <NotificationLayout onClose={() => setMessage("")}>{message}</NotificationLayout>
      )}
    </>
  );
};

export default Portfolio;
