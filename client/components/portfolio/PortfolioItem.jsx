import { useState, useEffect } from "react";
import useHttp from "../../hooks/use-http";
import useInput from "../../hooks/use-input";
import { convertString } from "../../utilities/scripts";
import { validText, validLink, validType, validObject } from "../../../utilities/validations";
import constants from "../../../utilities/constants";
import Delete from "../actions/Delete";
import Link from "../actions/Link";
import Modal from "../portals/Modal";
import ModalLayout from "../layouts/ModalLayout";
import TextLayout from "../layouts/TextLayout";
import SelectLayout from "../layouts/SelectLayout";
import LogoLayout from "../layouts/LogoLayout";
import NotificationLayout from "../layouts/NotificationLayout";
import style from "../../App.module.css";
import { TableRow, TableCell } from "@mui/material";
import { Edit, Subtitles, Link as LinkIcon } from "@mui/icons-material";

const PortfolioItem = (props) => {
  const { portfolioItem, index, onCompleteEdit, onCompleteDeletion } = props;
  const [logo, setLogo] = useState(portfolioItem.logo);
  const [isDisplayed, setIsDisplayed] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { isLoading, error, sendRequest } = useHttp();
  const { value: title, isValid: titleIsValid, error: titleError, changeValue: changeTitle, initializeValue: initializeTitle, blur: blurTitle } = useInput(validText);
  const { value: link, isValid: linkIsValid, error: linkError, changeValue: changeLink, initializeValue: initializeLink, blur: blurLink } = useInput(validLink);
  const { value: type, isValid: typeIsValid, error: typeError, changeValue: changeType, initializeValue: initializeType, blur: blurType } = useInput((value) => validType(value, constants.PORTFOLIO_ITEM));

  const formIsValid = titleIsValid && linkIsValid && typeIsValid && validObject(logo);

  useEffect(() => initializeData(), [portfolioItem]);

  const completeEdit = (editedPortfolioItem) => {
    onCompleteEdit(editedPortfolioItem, portfolioItem.type);
    setIsEditing(false);
  };

  const editPortfolioItem = () => {
    if (!formIsValid) return;
  
    sendRequest(
      {
        url: `${window.location.origin}/editPortfolioItem/${portfolioItem._id}`,
        method: "PUT",
        body: JSON.stringify({ title, link, type, logo }),
        authentication: true
      },
      completeEdit
    );
  };

  const closeDialog = () => {
    setIsEditing(false);
    initializeData();
    setLogo(portfolioItem.logo);
  };

  const initializeData = () => {
    initializeTitle(portfolioItem.title);
    initializeLink(portfolioItem.link);
    initializeType(portfolioItem.type);
  };

  return (
    <>
      {isDisplayed && (
        <Modal data={portfolioItem.logo.data} name={portfolioItem.logo.name} onManage={() => setIsDisplayed(false)} />
      )}
      <TableRow>
        <TableCell align="right">{index}</TableCell>
        <TableCell align="right">{portfolioItem.title}</TableCell>
        <TableCell align="right"><Link value={portfolioItem.link} /></TableCell>
        <TableCell align="right" className={style.pointer} onClick={() => setIsDisplayed(true)}>{portfolioItem.logo.name}</TableCell>
        <TableCell align="right">{convertString(portfolioItem.type, true)}</TableCell>
        <TableCell align="right" className={style.actions}>
          <Edit className={style.pointer} onClick={() => setIsEditing(true)} />
          <Delete route={`/deletePortfolioItem/${portfolioItem._id}`} message={`Delete portfolio item ${portfolioItem.title}?`} onCompleteDeletion={() => onCompleteDeletion(portfolioItem._id, portfolioItem.type, portfolioItem.title)} />
          {isEditing && (
            <ModalLayout title="Edit portfolio item" isValid={formIsValid} isLoading={isLoading} onClose={closeDialog} onSave={editPortfolioItem}>
              <form autoComplete="off" noValidate>
                <TextLayout type="text" value={title} label="Title" error={titleError} onChange={changeTitle} onBlur={blurTitle} required><Subtitles /></TextLayout>
                <TextLayout type="text" value={link} label="Link" error={linkError} onChange={changeLink} onBlur={blurLink} required><LinkIcon /></TextLayout>
                <SelectLayout value={type} label="Type" error={typeError} options={constants.PORTFOLIO_OPTIONS} onChange={changeType} onBlur={blurType} required />
                <LogoLayout logo={logo} required onUpload={setLogo} />
              </form>
            </ModalLayout>
          )}
          {error && (
            <NotificationLayout isError>{error}</NotificationLayout>
          )}
        </TableCell>
      </TableRow>
    </>
  );
};

export default PortfolioItem;
