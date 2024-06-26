import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import useInput from "../../hooks/use-input";
import { login } from "../../utilities/authentication";
import { get, remember, forget } from "../../utilities/rememberMe";
import { validUsername, validPassword, validText } from "../../../utilities/validations";
import TextLayout from "../layouts/TextLayout";
import CheckboxLayout from "../layouts/CheckboxLayout";
import MessageLayout from "../layouts/MessageLayout";
import style from "../../App.module.css";
import { Button } from "@mui/material";
import { Person, Lock, Login as LoginIcon, Home } from "@mui/icons-material";

const Login = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const { isLoading, error, sendRequest } = useHttp();
  const { value: username, isValid: usernameIsValid, error: usernameError, changeValue: changeUsername, initializeValue: initializeUsername, blur: blurUsername, resetValue: resetUsername } = useInput(validUsername);
  const { value: password, isValid: passwordIsValid, error: passwordError, changeValue: changePassword, blur: blurPassword, resetValue: resetPassword } = useInput(validPassword);

  useEffect(() => {
    const rememberMe = get();
    const { username } = rememberMe;
    if (validUsername(username)) {
      setRememberMe(true);
      initializeUsername(username);
    }
  }, []);

  const formIsValid = usernameIsValid && passwordIsValid;

  const completeLogin = (data) => {
    const { token, userId } = data;
    if (rememberMe) remember(username);
    else forget();
    login(token, userId, username);
    resetUsername();
    resetPassword();
    if (validText(token)) navigate("/overview");
    else navigate("/authentication");
  };

  const loginUser = (event) => {
    event.preventDefault();
    if (!formIsValid) return;

    sendRequest(
      {
        url: `${window.location.origin}/login`,
        method: "POST",
        body: JSON.stringify({ username, password })
      },
      completeLogin
    );
  };

  return (
    <form className={`${style.auto} ${style.smallContent} ${style.marginBottom}`} onSubmit={loginUser} autoComplete="off" noValidate>
      <h1 className={style.center}>Login</h1>
      {validText(error) && (
        <MessageLayout message={error} />
      )}
      <TextLayout type="text" value={username} label="Username" error={usernameError} onChange={changeUsername} onBlur={blurUsername} required><Person /></TextLayout>
      <TextLayout type="password" value={password} label="Password" error={passwordError} onChange={changePassword} onBlur={blurPassword} required><Lock /></TextLayout>
      <CheckboxLayout checked={rememberMe} label="Remember me?" onChange={(event) => setRememberMe(event.target.checked)} />
      <Button type="submit" variant="contained" endIcon={<LoginIcon />} className={style.fullWidth} disabled={!formIsValid || isLoading}>{isLoading ? "Loading..." : "Login"}</Button>
      <Button type="button" color="success" variant="contained" endIcon={<Home />} className={`${style.fullWidth} ${style.marginTop}`} onClick={() => navigate("/")}>About</Button>
    </form>
  );
};

export default Login;
