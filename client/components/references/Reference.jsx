import { useState, useEffect } from "react";
import useHttp from "../../hooks/use-http";
import useInput from "../../hooks/use-input";
import { convertString } from "../../utilities/scripts";
import { validText, validType, validObject } from "../../../utilities/validations";
import constants from "../../../utilities/constants";
import Delete from "../actions/Delete";
import Modal from "../portals/Modal";
import ModalLayout from "../layouts/ModalLayout";
import TextLayout from "../layouts/TextLayout";
import LogoLayout from "../layouts/LogoLayout";
import SelectLayout from "../layouts/SelectLayout";
import NotificationLayout from "../layouts/NotificationLayout";
import defaultStyle from "../../App.module.css";
import americanFlag from "../../../utilities/assets/americanFlag.png";
import germanFlag from "../../../utilities/assets/germanFlag.png";
import { TableRow, TableCell } from "@mui/material";
import { Edit, Subtitles, CalendarMonth } from "@mui/icons-material";

const Reference = (props) => {
  const { reference, index, onCompleteEdit, onCompleteDeletion } = props;
  const [logo, setLogo] = useState(reference.logo);
  const [isDisplayed, setIsDisplayed] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { isLoading, error, sendRequest } = useHttp();
  const { value: title, isValid: titleIsValid, error: titleError, changeValue: changeTitle, initializeValue: initializeTitle, blur: blurTitle } = useInput(validText);
  const { value: title_de, isValid: title_deIsValid, error: title_deError, changeValue: changeTitle_de, initializeValue: initializeTitle_de, blur: blurTitle_de } = useInput(validText);
  const { value: duration, isValid: durationIsValid, error: durationError, changeValue: changeDuration, initializeValue: initializeDuration, blur: blurDuration } = useInput(validText);
  const { value: duration_de, isValid: duration_deIsValid, error: duration_deError, changeValue: changeDuration_de, initializeValue: initializeDuration_de, blur: blurDuration_de } = useInput(validText);
  const { value: type, isValid: typeIsValid, error: typeError, changeValue: changeType, initializeValue: initializeType, blur: blurType } = useInput((value) => validType(value, constants.REFERENCE));

  const formIsValid = titleIsValid && title_deIsValid && durationIsValid && duration_deIsValid && typeIsValid && validObject(logo);

  useEffect(() => initializeData(), [reference]);

  const completeEdit = (editedReference) => {
    onCompleteEdit(editedReference, reference.type);
    setIsEditing(false);
  };

  const editReference = () => {
    if (!formIsValid) return;
  
    sendRequest(
      {
        url: `${window.location.origin}/editReference/${reference._id}`,
        method: "PUT",
        body: JSON.stringify({ title, title_de, duration, duration_de, type, logo }),
        authentication: true
      },
      completeEdit
    );
  };

  const closeDialog = () => {
    setIsEditing(false);
    initializeData();
    setLogo(reference.logo);
  };

  const initializeData = () => {
    initializeTitle(reference.title);
    initializeTitle_de(reference.title_de);
    initializeDuration(reference.duration);
    initializeDuration_de(reference.duration_de);
    initializeType(reference.type);
  };

  return (
    <>
      {isDisplayed && (
        <Modal data={reference.logo.data} name={reference.logo.name} onManage={() => setIsDisplayed(false)} />
      )}
      <TableRow>
        <TableCell align="right" rowSpan={2}>{index}</TableCell>
        <TableCell align="right" rowSpan={2}><img src={americanFlag} alt="American flag" className={defaultStyle.flag} /><br /><img src={germanFlag} alt="German flag" className={defaultStyle.flag} /></TableCell>
        <TableCell align="right" rowSpan={2}>{reference.title}<br />{reference.title_de}</TableCell>
        <TableCell align="right" rowSpan={2}>{reference.duration}<br />{reference.duration_de}</TableCell>
        <TableCell align="right" rowSpan={2} className={defaultStyle.pointer} onClick={() => setIsDisplayed(true)}>{reference.logo.name}</TableCell>
        <TableCell align="right" rowSpan={2}>{convertString(reference.type, true)}</TableCell>
        <TableCell align="right" className={defaultStyle.actions}>
          <Edit className={defaultStyle.pointer} onClick={() => setIsEditing(true)} />
          <Delete route={`/deleteReference/${reference._id}`} message={`Delete reference ${reference.title}?`} onCompleteDeletion={() => onCompleteDeletion(reference._id, reference.type, reference.title)} />
          {isEditing && (
            <ModalLayout title="Edit reference" isValid={formIsValid} isLoading={isLoading} onClose={closeDialog} onSave={editReference}>
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
        </TableCell>
      </TableRow>
      <TableRow />
    </>
  );
};

export default Reference;
