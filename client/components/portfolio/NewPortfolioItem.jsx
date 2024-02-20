import { useState } from "react";
import useHttp from "../../hooks/use-http";
import useInput from "../../hooks/use-input";
import { validText, validLink, validType, validObject } from "../../../utilities/validations";
import constants from "../../../utilities/constants";
import ModalLayout from "../layouts/ModalLayout";
import TextLayout from "../layouts/TextLayout";
import SelectLayout from "../layouts/SelectLayout";
import LogoLayout from "../layouts/LogoLayout";
import NotificationLayout from "../layouts/NotificationLayout";
import defaultStyle from "../../App.module.css";
import { Button } from "@mui/material";
import { Add, Subtitles, Link } from "@mui/icons-material";

const NewPortfolioItem = (props) => {
  const { onCompleteCreation } = props;
  const [logo, setLogo] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const { isLoading, error, sendRequest } = useHttp();
  const { value: title, isValid: titleIsValid, error: titleError, changeValue: changeTitle, blur: blurTitle, resetValue: resetTitle } = useInput(validText);
  const { value: link, isValid: linkIsValid, error: linkError, changeValue: changeLink, blur: blurLink, resetValue: resetLink } = useInput(validLink);
  const { value: type, isValid: typeIsValid, error: typeError, changeValue: changeType, blur: blurType, resetValue: resetType } = useInput((value) => validType(value, constants.PORTFOLIO_ITEM));

  const formIsValid = titleIsValid && linkIsValid && typeIsValid && validObject(logo);

  const completeCreation = (newPortfolioItem) => {
    resetTitle();
    resetLink();
    resetType();
    setLogo({});
    setIsOpen(false);
    onCompleteCreation(newPortfolioItem, true);
  };

  const createNewPortfolioItem = () => {
    if (!formIsValid) return;

    sendRequest(
      {
        url: `${window.location.origin}/createPortfolioItem`,
        method: "POST",
        body: JSON.stringify({ title, link, type, logo }),
        authentication: true
      },
      completeCreation
    );
  };

  const closeDialog = () => {
    resetTitle();
    resetLink();
    resetType();
    setLogo({});
    setIsOpen(false);
  };

  return (
    <>
      <div className={defaultStyle.center}><Button type="button" variant="contained" endIcon={<Add />} onClick={() => setIsOpen(true)}>New portfolio item</Button></div>
      {isOpen && (
        <ModalLayout title="New portfolio item" isValid={formIsValid} isLoading={isLoading} onClose={closeDialog} onSave={createNewPortfolioItem}>
          <form autoComplete="off" noValidate>
            <TextLayout type="text" value={title} label="Title" error={titleError} onChange={changeTitle} onBlur={blurTitle} required><Subtitles /></TextLayout>
            <TextLayout type="text" value={link} label="Link" error={linkError} onChange={changeLink} onBlur={blurLink} required><Link /></TextLayout>
            <SelectLayout value={type} label="Type" error={typeError} options={constants.PORTFOLIO_OPTIONS} onChange={changeType} onBlur={blurType} required />
            <LogoLayout logo={logo} onUpload={setLogo} />
          </form>
        </ModalLayout>
      )}
      {error && (
        <NotificationLayout isError>{error}</NotificationLayout>
      )}
    </>
  );
};

export default NewPortfolioItem;
