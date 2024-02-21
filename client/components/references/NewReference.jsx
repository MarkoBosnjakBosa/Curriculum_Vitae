import { useState } from "react";
import useHttp from "../../hooks/use-http";
import useInput from "../../hooks/use-input";
import { validText, validType, validObject } from "../../../utilities/validations";
import constants from "../../../utilities/constants";
import ModalLayout from "../layouts/ModalLayout";
import TextLayout from "../layouts/TextLayout";
import SelectLayout from "../layouts/SelectLayout";
import LogoLayout from "../layouts/LogoLayout";
import NotificationLayout from "../layouts/NotificationLayout";
import defaultStyle from "../../App.module.css";
import { Button } from "@mui/material";
import { Add, Subtitles, CalendarMonth } from "@mui/icons-material";

const NewReference = (props) => {
  const { onCompleteCreation } = props;
  const [logo, setLogo] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const { isLoading, error, sendRequest } = useHttp();
  const { value: title, isValid: titleIsValid, error: titleError, changeValue: changeTitle, blur: blurTitle, resetValue: resetTitle } = useInput(validText);
  const { value: title_de, isValid: title_deIsValid, error: title_deError, changeValue: changeTitle_de, blur: blurTitle_de, resetValue: resetTitle_de } = useInput(validText);
  const { value: duration, isValid: durationIsValid, error: durationError, changeValue: changeDuration, blur: blurDuration, resetValue: resetDuration } = useInput(validText);
  const { value: duration_de, isValid: duration_deIsValid, error: duration_deError, changeValue: changeDuration_de, blur: blurDuration_de, resetValue: resetDuration_de } = useInput(validText);
  const { value: type, isValid: typeIsValid, error: typeError, changeValue: changeType, blur: blurType, resetValue: resetType } = useInput((value) => validType(value, constants.REFERENCE));

  const formIsValid = titleIsValid && title_deIsValid && durationIsValid && duration_deIsValid && typeIsValid && validObject(logo);

  const completeCreation = (newReference) => {
    resetTitle();
    resetTitle_de();
    resetDuration();
    resetDuration_de();
    resetType();
    setLogo({});
    setIsOpen(false);
    onCompleteCreation(newReference, true);
  };

  const createNewReference = () => {
    if (!formIsValid) return;

    sendRequest(
      {
        url: `${window.location.origin}/createReference`,
        method: "POST",
        body: JSON.stringify({ title, title_de, duration, duration_de, type, logo }),
        authentication: true
      },
      completeCreation
    );
  };

  const closeDialog = () => {
    resetTitle();
    resetTitle_de();
    resetDuration();
    resetDuration_de();
    resetType();
    setLogo({});
    setIsOpen(false);
  };

  return (
    <>
      <div className={defaultStyle.center}><Button type="button" variant="contained" endIcon={<Add />} onClick={() => setIsOpen(true)}>New reference</Button></div>
      {isOpen && (
        <ModalLayout title="New reference" isValid={formIsValid} isLoading={isLoading} onClose={closeDialog} onSave={createNewReference}>
          <form autoComplete="off" noValidate>
            <TextLayout type="text" value={title} label="Title" error={titleError} onChange={changeTitle} onBlur={blurTitle} required><Subtitles /></TextLayout>
            <TextLayout type="text" value={title_de} label="Title DE" error={title_deError} onChange={changeTitle_de} onBlur={blurTitle_de} required><Subtitles /></TextLayout>
            <TextLayout type="text" value={duration} label="Duration" error={durationError} onChange={changeDuration} onBlur={blurDuration} required><CalendarMonth /></TextLayout>
            <TextLayout type="text" value={duration_de} label="Duration DE" error={duration_deError} onChange={changeDuration_de} onBlur={blurDuration_de} required><CalendarMonth /></TextLayout>
            <SelectLayout value={type} label="Type" error={typeError} options={constants.REFERENCES_OPTIONS} onChange={changeType} onBlur={blurType} required />
            <LogoLayout logo={logo} required onUpload={setLogo} />
          </form>
        </ModalLayout>
      )}
      {error && (
        <NotificationLayout isError>{error}</NotificationLayout>
      )}
    </>
  );
};

export default NewReference;
