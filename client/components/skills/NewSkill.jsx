import { useState } from "react";
import useHttp from "../../hooks/use-http";
import useInput from "../../hooks/use-input";
import { validText } from "../../../utilities/validations";
import ModalLayout from "../layouts/ModalLayout";
import TextLayout from "../layouts/TextLayout";
import NotificationLayout from "../layouts/NotificationLayout";
import style from "../../App.module.css";
import { Button } from "@mui/material";
import { Add, Subtitles } from "@mui/icons-material";

const NewSkill = (props) => {
  const { onCompleteCreation } = props;
  const [isOpen, setIsOpen] = useState(false);

  const { isLoading, error, sendRequest } = useHttp();
  const { value: title, isValid: titleIsValid, error: titleError, changeValue: changeTitle, blur: blurTitle, resetValue: resetTitle } = useInput(validText);

  const completeCreation = (newSkill) => {
    resetTitle();
    setIsOpen(false);
    onCompleteCreation(newSkill);
  };

  const createSkill = () => {
    if (!titleIsValid) return;

    sendRequest(
      {
        url: `${window.location.origin}/createSkill`,
        method: "POST",
        body: JSON.stringify({ title }),
        authentication: true
      },
      completeCreation
    );
  };

  const closeDialog = () => {
    resetTitle();
    setIsOpen(false);
  };

  return (
    <>
      <div className={`${style.center} ${style.marginBottom}`}><Button type="button" variant="contained" endIcon={<Add />} onClick={() => setIsOpen(true)}>New skill</Button></div>
      {isOpen && (
        <ModalLayout title="New skill" isValid={titleIsValid} isLoading={isLoading} onClose={closeDialog} onSave={createSkill}>
          <form autoComplete="off" noValidate>
            <TextLayout type="text" value={title} label="Title" error={titleError} onChange={changeTitle} onBlur={blurTitle} required><Subtitles /></TextLayout>
          </form>
        </ModalLayout>
      )}
      {error && (
        <NotificationLayout isError>{error}</NotificationLayout>
      )}
    </>
  );
};

export default NewSkill;
