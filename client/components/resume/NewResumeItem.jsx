import { useState } from "react";
import useHttp from "../../hooks/use-http";
import useInput from "../../hooks/use-input";
import { validText, validType } from "../../../utilities/validations";
import constants from "../../../utilities/constants";
import ModalLayout from "../layouts/ModalLayout";
import TextLayout from "../layouts/TextLayout";
import SelectLayout from "../layouts/SelectLayout";
import NotificationLayout from "../layouts/NotificationLayout";
import style from "../../App.module.css";
import { Button } from "@mui/material";
import { Add, Subtitles, Place, AccessTime, Description } from "@mui/icons-material";

const NewResumeItem = (props) => {
  const { onCompleteCreation } = props;
  const [isOpen, setIsOpen] = useState(false);

  const { isLoading, error, sendRequest } = useHttp();
  const { value: title, isValid: titleIsValid, error: titleError, changeValue: changeTitle, blur: blurTitle, resetValue: resetTitle } = useInput(validText);
  const { value: title_de, isValid: title_deIsValid, error: title_deError, changeValue: changeTitle_de, blur: blurTitle_de, resetValue: resetTitle_de } = useInput(validText);
  const { value: workPlace, isValid: workPlaceIsValid, error: workPlaceError, changeValue: changeWorkPlace, blur: blurWorkPlace, resetValue: resetWorkPlace } = useInput(validText);
  const { value: workPlace_de, isValid: workPlace_deIsValid, error: workPlace_deError, changeValue: changeWorkPlace_de, blur: blurWorkPlace_de, resetValue: resetWorkplace_de } = useInput(validText);
  const { value: duration, isValid: durationIsValid, error: durationError, changeValue: changeDuration, blur: blurDuration, resetValue: resetDuration } = useInput(validText);
  const { value: duration_de, isValid: duration_deIsValid, error: duration_deError, changeValue: changeDuration_de, blur: blurDuration_de, resetValue: resetDuration_de } = useInput(validText);
  const { value: description, changeValue: changeDescription, resetValue: resetDescription } = useInput(validText);
  const { value: description_de, changeValue: changeDescription_de, resetValue: resetDescription_de } = useInput(validText);
  const { value: type, isValid: typeIsValid, error: typeError, changeValue: changeType, blur: blurType, resetValue: resetType } = useInput((value) => validType(value, constants.RESUME_ITEM));

  const formIsValid = titleIsValid && title_deIsValid && workPlaceIsValid && workPlace_deIsValid && durationIsValid && duration_deIsValid && typeIsValid;

  const completeCreation = (newPortfolioItem) => {
    resetTitle();
    resetTitle_de();
    resetWorkPlace();
    resetWorkplace_de();
    resetDuration();
    resetDuration_de();
    resetDescription();
    resetDescription_de();
    resetType();
    setIsOpen(false);
    onCompleteCreation(newPortfolioItem, true);
  };

  const createNewResumeItem = () => {
    if (!formIsValid) return;

    sendRequest(
      {
        url: `${window.location.origin}/createResumeItem`,
        method: "POST",
        body: JSON.stringify({ title, title_de, workPlace, workPlace_de, duration, duration_de, description, description_de, type }),
        authentication: true
      },
      completeCreation
    );
  };

  const closeDialog = () => {
    resetTitle();
    resetTitle_de();
    resetWorkPlace();
    resetWorkplace_de();
    resetDuration();
    resetDuration_de();
    resetDescription();
    resetDescription_de();
    resetType();
    setIsOpen(false);
  };

  return (
    <>
      <div className={style.center}><Button type="button" variant="contained" endIcon={<Add />} onClick={() => setIsOpen(true)}>New resume item</Button></div>
      {isOpen && (
        <ModalLayout title="New resume item" isValid={formIsValid} isLoading={isLoading} onClose={closeDialog} onSave={createNewResumeItem}>
          <form autoComplete="off" noValidate>
            <TextLayout type="text" value={title} label="Title" error={titleError} onChange={changeTitle} onBlur={blurTitle} required><Subtitles /></TextLayout>
            <TextLayout type="text" value={title_de} label="Title DE" error={title_deError} onChange={changeTitle_de} onBlur={blurTitle_de} required><Subtitles /></TextLayout>
            <TextLayout type="text" value={workPlace} label="Work place" error={workPlaceError} onChange={changeWorkPlace} onBlur={blurWorkPlace} required><Place /></TextLayout>
            <TextLayout type="text" value={workPlace_de} label="Work place DE" error={workPlace_deError} onChange={changeWorkPlace_de} onBlur={blurWorkPlace_de} required><Place /></TextLayout>
            <TextLayout type="text" value={duration} label="Duration" error={durationError} onChange={changeDuration} onBlur={blurDuration} required><AccessTime /></TextLayout>
            <TextLayout type="text" value={duration_de} label="Duration DE" error={duration_deError} onChange={changeDuration_de} onBlur={blurDuration_de} required><AccessTime /></TextLayout>
            <TextLayout type="text" value={description} label="Description" onChange={changeDescription}><Description /></TextLayout>
            <TextLayout type="text" value={description_de} label="Description DE" onChange={changeDescription_de}><Description /></TextLayout>
            <SelectLayout value={type} label="Type" error={typeError} options={constants.RESUME_OPTIONS} onChange={changeType} onBlur={blurType} required />
          </form>
        </ModalLayout>
      )}
      {error && (
        <NotificationLayout isError>{error}</NotificationLayout>
      )}
    </>
  );
};

export default NewResumeItem;
