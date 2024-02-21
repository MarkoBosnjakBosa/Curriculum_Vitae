import { useState } from "react";
import useHttp from "../../hooks/use-http";
import useInput from "../../hooks/use-input";
import { get } from "../../utilities/authentication";
import { validPassword, validText } from "../../../utilities/validations";
import TextLayout from "../layouts/TextLayout";
import MessageLayout from "../layouts/MessageLayout";
import NotificationLayout from "../layouts/NotificationLayout";
import defaultStyle from "../../App.module.css";
import { Button } from "@mui/material";
import { Lock, SaveAlt } from "@mui/icons-material";

const Password = () => {
  const [isSaved, setIsSaved] = useState(false);
  const { userId } = get();

  const { isLoading, error, sendRequest } = useHttp();
  const { value: password, isValid: passwordIsValid, error: passwordError, changeValue: changePassword, blur: blurPassword, resetValue: resetPassword } = useInput(validPassword);

  const completeEdit = () => {
    resetPassword();
    setIsSaved(true);
  };

  const editPassword = (event) => {
    event.preventDefault();
    if (!passwordIsValid) return;

    sendRequest(
      {
        url: `${window.location.origin}/editPassword/${userId}`,
        method: "PUT",
        body: JSON.stringify({ password }),
        authentication: true
      },
      completeEdit
    );
  };

  return (
    <>
      <form className={`${defaultStyle.auto} ${defaultStyle.marginBottom} ${defaultStyle.smallContent}`} onSubmit={editPassword} autoComplete="off" noValidate>
        <h1 className={defaultStyle.center}>Password</h1>
        {validText(error) && (
          <MessageLayout message={error} />
        )}
        <TextLayout type="password" value={password} label="Password" error={passwordError} onChange={changePassword} onBlur={blurPassword} required><Lock /></TextLayout>
        <div className={defaultStyle.alignRight}>
          <Button type="submit" variant="contained" endIcon={<SaveAlt />} disabled={!passwordIsValid || isLoading}>{isLoading ? "Loading..." : "Save"}</Button>
        </div>
      </form>
      {isSaved && (
        <NotificationLayout onClose={() => setIsSaved("")}>Password has been successfully saved!</NotificationLayout>
      )}
    </>
  );
};

export default Password;
