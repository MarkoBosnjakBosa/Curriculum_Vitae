import { useState, useEffect } from "react";
import useHttp from "../../hooks/use-http";
import useInput from "../../hooks/use-input";
import { convertString } from "../../utilities/scripts";
import { validText, validType } from "../../../utilities/validations";
import constants from "../../../utilities/constants";
import Delete from "../actions/Delete";
import ModalLayout from "../layouts/ModalLayout";
import TextLayout from "../layouts/TextLayout";
import SelectLayout from "../layouts/SelectLayout";
import NotificationLayout from "../layouts/NotificationLayout";
import style from "../../App.module.css";
import americanFlag from "../../../utilities/assets/americanFlag.png";
import germanFlag from "../../../utilities/assets/germanFlag.png";
import { TableRow, TableCell } from "@mui/material";
import { Edit, Subtitles, Place, AccessTime, Description } from "@mui/icons-material";

const ResumeItem = (props) => {
  const { resumeItem, index, onCompleteEdit, onCompleteDeletion } = props;
  const [isEditing, setIsEditing] = useState(false);

  const { isLoading, error, sendRequest } = useHttp();
  const { value: title, isValid: titleIsValid, error: titleError, changeValue: changeTitle, initializeValue: initializeTitle, blur: blurTitle } = useInput(validText);
  const { value: title_de, isValid: title_deIsValid, error: title_deError, changeValue: changeTitle_de, initializeValue: initializeTitle_de, blur: blurTitle_de } = useInput(validText);
  const { value: workPlace, isValid: workPlaceIsValid, error: workPlaceError, changeValue: changeWorkPlace, initializeValue: initializeWorkPlace, blur: blurWorkPlace } = useInput(validText);
  const { value: workPlace_de, isValid: workPlace_deIsValid, error: workPlace_deError, changeValue: changeWorkPlace_de, initializeValue: initializeWorkPlace_de, blur: blurWorkPlace_de } = useInput(validText);
  const { value: duration, isValid: durationIsValid, error: durationError, changeValue: changeDuration, initializeValue: initializeDuration, blur: blurDuration } = useInput(validText);
  const { value: duration_de, isValid: duration_deIsValid, error: duration_deError, changeValue: changeDuration_de, initializeValue: initializeDuration_de, blur: blurDuration_de } = useInput(validText);
  const { value: description, changeValue: changeDescription, initializeValue: initializeDescription } = useInput(validText);
  const { value: description_de, changeValue: changeDescription_de, initializeValue: initializeDescription_de } = useInput(validText);
  const { value: type, isValid: typeIsValid, error: typeError, changeValue: changeType, initializeValue: initializeType, blur: blurType } = useInput((value) => validType(value, constants.RESUME_ITEM));

  const formIsValid = titleIsValid && title_deIsValid && workPlaceIsValid && workPlace_deIsValid && durationIsValid && duration_deIsValid && typeIsValid;

  useEffect(() => initializeData(), [resumeItem]);

  const completeEdit = (editedResumeItem) => {
    onCompleteEdit(editedResumeItem, resumeItem.type);
    setIsEditing(false);
  };

  const editResumeItem = () => {
    if (!formIsValid) return;
  
    sendRequest(
      {
        url: `${window.location.origin}/editResumeItem/${resumeItem._id}`,
        method: "PUT",
        body: JSON.stringify({ title, title_de, workPlace, workPlace_de, duration, duration_de, description, description_de, type }),
        authentication: true
      },
      completeEdit
    );
  };

  const closeDialog = () => {
    setIsEditing(false);
    initializeData();
  };

  const initializeData = () => {
    initializeTitle(resumeItem.title);
    initializeTitle_de(resumeItem.title_de);
    initializeWorkPlace(resumeItem.workPlace);
    initializeWorkPlace_de(resumeItem.workPlace_de);
    initializeDuration(resumeItem.duration);
    initializeDuration_de(resumeItem.duration_de);
    initializeDescription(resumeItem.description);
    initializeDescription_de(resumeItem.description_de);
    initializeType(resumeItem.type);
  };

  return (
    <>
      <TableRow>
        <TableCell align="right" rowSpan={2}>{index}</TableCell>
        <TableCell align="right" rowSpan={2}><img src={americanFlag} alt="American flag" className={style.flag} /><br /><img src={germanFlag} alt="German flag" className={style.flag} /></TableCell>
        <TableCell align="right" rowSpan={2}>{resumeItem.title}<br />{resumeItem.title_de}</TableCell>
        <TableCell align="right" rowSpan={2}>{resumeItem.workPlace}<br />{resumeItem.workPlace_de}</TableCell>
        <TableCell align="right" rowSpan={2}>{resumeItem.duration}<br />{resumeItem.duration_de}</TableCell>
        <TableCell align="right" rowSpan={2}>{resumeItem.description}<br />{resumeItem.description_de}</TableCell>
        <TableCell align="right" rowSpan={2}>{convertString(resumeItem.type, true)}</TableCell>
        <TableCell align="right" rowSpan={2} className={style.actions}>
          <Edit className={style.pointer} onClick={() => setIsEditing(true)} />
          <Delete route={`/deleteResumeItem/${resumeItem._id}`} message={`Delete resume item ${resumeItem.title}?`} onCompleteDeletion={() => onCompleteDeletion(resumeItem._id, resumeItem.type, resumeItem.title)} />
          {isEditing && (
            <ModalLayout title="Edit resume item" isValid={formIsValid} isLoading={isLoading} onClose={closeDialog} onSave={editResumeItem}>
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
        </TableCell>
      </TableRow>
      <TableRow />
    </>
  );
};

export default ResumeItem;
