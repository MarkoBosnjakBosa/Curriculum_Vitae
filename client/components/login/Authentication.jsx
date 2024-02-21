import { useNavigate } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import useInput from "../../hooks/use-input";
import { login } from "../../utilities/authentication";
import { validText, validToken } from "../../../utilities/validations";
import TextLayout from "../layouts/TextLayout";
import MessageLayout from "../layouts/MessageLayout";
import defaultStyle from "../../App.module.css";
import { Button } from "@mui/material";
import { LockClock, Check } from "@mui/icons-material";

const Authentication = (props) => {
  const { userId } = props;
  const navigate = useNavigate();

  const { isLoading, error, sendRequest } = useHttp();
  const { value: token, isValid: tokenIsValid, error: tokenError, changeValue: changeToken, blur: blurToken, resetValue: resetToken } = useInput(validToken);

  const completeAuthentication = (data) => {
    const { token, username } = data;
    login(token, userId, username);
    resetToken();
    navigate("/overview");
  };

  const authenticate = (event) => {
    event.preventDefault();
    if (!tokenIsValid) return;

    sendRequest(
      {
        url: `${window.location.origin}/authenticate/${userId}`,
        method: "POST",
        body: JSON.stringify({ token })
      },
      completeAuthentication
    );
  };

  return (
    <form className={`${defaultStyle.auto} ${defaultStyle.smallContent} ${defaultStyle.marginBottom}`} onSubmit={authenticate} autoComplete="off" noValidate>
      <h1 className={defaultStyle.center}>Authentication</h1>
      {validText(error) && (
        <MessageLayout message={error} />
      )}
      <TextLayout type="text" value={token} label="Token" error={tokenError} onChange={changeToken} onBlur={blurToken} required><LockClock /></TextLayout>
      <div className={defaultStyle.alignRight}>
        <Button type="submit" variant="contained" endIcon={<Check />} disabled={!tokenIsValid || isLoading}>{isLoading ? "Loading..." : "Submit"}</Button>
      </div>
    </form>
  );
};

export default Authentication;
