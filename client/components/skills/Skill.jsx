import { useState, useEffect } from "react";
import useHttp from "../../hooks/use-http";
import useInput from "../../hooks/use-input";
import { validText } from "../../../utilities/validations";
import Delete from "../actions/Delete";
import ModalLayout from "../layouts/ModalLayout";
import TextLayout from "../layouts/TextLayout";
import NotificationLayout from "../layouts/NotificationLayout";
import defaultStyle from "../../App.module.css";
import { TableRow, TableCell } from "@mui/material";
import { Edit, Subtitles } from "@mui/icons-material";

const Skill = (props) => {
  const { skill, index, onCompleteEdit, onCompleteDeletion } = props;
  const [isEditing, setIsEditing] = useState(false);

  const { isLoading, error, sendRequest } = useHttp();
  const { value: title, isValid: titleIsValid, error: titleError, changeValue: changeTitle, initializeValue: initializeTitle, blur: blurTitle } = useInput(validText);

  useEffect(() => initializeData(), [skill]);

  const completeEdit = (editedSkill) => {
    onCompleteEdit(editedSkill);
    setIsEditing(false);
  };

  const editSkill = () => {
    if (!titleIsValid) return;
  
    sendRequest(
      {
        url: `${window.location.origin}/editSkill/${skill._id}`,
        method: "PUT",
        body: JSON.stringify({ title }),
        authentication: true
      },
      completeEdit
    );
  };

  const closeDialog = () => {
    setIsEditing(false);
    initializeData();
  };

  const initializeData = () => initializeTitle(skill.title);

  return (
    <TableRow>
      <TableCell align="right">{index}</TableCell>
      <TableCell align="right">{skill.title}</TableCell>
      <TableCell align="right" className={defaultStyle.actions}>
        <Edit className={defaultStyle.pointer} onClick={() => setIsEditing(true)} />
        <Delete route={`/deleteSkill/${skill._id}`} message={`Delete skill ${skill.title}?`} onCompleteDeletion={() => onCompleteDeletion(skill._id, skill.title)} />
        {isEditing && (
          <ModalLayout title="Edit skill" isValid={titleIsValid} isLoading={isLoading} onClose={closeDialog} onSave={editSkill}>
            <form autoComplete="off" noValidate>
              <TextLayout type="text" value={title} label="Title" error={titleError} onChange={changeTitle} onBlur={blurTitle} required><Subtitles /></TextLayout>
            </form>
          </ModalLayout>
        )}
        {error && (
          <NotificationLayout isError>{error}</NotificationLayout>
        )}
      </TableCell>
    </TableRow>
  );
};

export default Skill;
