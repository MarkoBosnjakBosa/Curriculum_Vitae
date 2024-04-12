import { useState } from "react";
import useHttp from "../../hooks/use-http";
import useInput from "../../hooks/use-input";
import { validText, validToken } from "../../../utilities/validations";
import TextLayout from "../layouts/TextLayout";
import MessageLayout from "../layouts/MessageLayout";
import defaultStyle from "../../App.module.css";
import style from "./Profile.module.css";
import { Chip, Button } from "@mui/material";
import { Warning, QrCodeScanner, Token, Check } from "@mui/icons-material";

const Setup = (props) => {
  const [user, setUser] = useState(props.user);
  const { _id: userId, authentication } = user;
  const { isEnabled } = authentication;
  const [qrCode, setQRCode] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const { isLoading: isSecretLoading, error: secretError, sendRequest: sendSecretRequest } = useHttp();
  const { isLoading: isAuthenticationLoading, error: authenticationError, sendRequest: sendAuthenticationRequest } = useHttp();
  const { value: token, isValid: tokenIsValid, error: tokenError, changeValue: changeToken, blur: blurToken, resetValue: resetToken } = useInput(validToken);

  const getSecret = () => {
    sendSecretRequest(
      {
        url: `${window.location.origin}/getSecret/${userId}`,
        method: "GET",
        authentication: true
      },
      setQRCode
    );
  };

  const completeAuthentication = (isEnabled) => {
    setUser((previousUser) => ({ ...previousUser, authentication: { ...authentication, isEnabled } }));
    setQRCode("");
    resetToken();
    setIsSaved(true);
  };

  const setAuthentication = (isEnabled, event) => {
    event.preventDefault();
    if (isEnabled && !tokenIsValid) return;
    if (!isEnabled) {
      const isConfirmed = window.confirm("Disable 2FA?");
      if (!isConfirmed) return;
    }

    sendAuthenticationRequest(
      {
        url: `${window.location.origin}/setAuthentication/${userId}`,
        method: "PUT",
        body: JSON.stringify({ isEnabled, token }),
        authentication: true
      },
      completeAuthentication
    );    
  };

  return (
    <>
      <h1 className={defaultStyle.center}>Setup</h1>
      <div className={`${defaultStyle.auto} ${style.content}`}>
        {isSaved && (
          <MessageLayout message="The setup has been successfully saved!" onClose={() => setIsSaved(false)} />
        )}
        {(validText(secretError) || validText(authenticationError)) && (
          <MessageLayout message={secretError || authenticationError} />
        )}
        <div className={defaultStyle.center}>
          <div className={defaultStyle.marginBottom}>
            <Chip color={isEnabled ? "primary" : "error"} label={isEnabled ? "Enabled" : "Disabled"} className={`${defaultStyle.width} ${style.chip}`} />
          </div>
          <div className={defaultStyle.marginBottom}>
            {isEnabled ? (
              <>
                <div className={defaultStyle.marginBottom}>
                  <strong>
                    Disable 2FA authentication.<br />
                    SMS authentication will not be required, when logging in.
                  </strong>
                </div>
                <Button type="button" variant="contained" color="error" endIcon={<Warning />} onClick={(event) => setAuthentication(false, event)}>Disable</Button>
              </>
            ) : (
              <>
                <div className={defaultStyle.marginBottom}>
                  <strong>
                    Enable 2fa authentication.<br />
                    QR code will be required, when logging in.
                  </strong>
                </div>
                <Button type="button" variant="contained" endIcon={<QrCodeScanner />} onClick={getSecret} disabled={isSecretLoading}>{isSecretLoading ? "Loading..." : "Generate QR code"}</Button>
                {validText(qrCode) && (
                  <form onSubmit={(event) => setAuthentication(true, event)} autoComplete="off" noValidate>
                    <img src={qrCode} alt="QR code" />
                    <TextLayout type="text" value={token} label="Token" error={tokenError} onChange={changeToken} onBlur={blurToken} required><Token /></TextLayout>
                    <div className={defaultStyle.alignRight}>
                      <Button type="submit" variant="contained" endIcon={<Check />} disabled={!tokenIsValid || isAuthenticationLoading}>{isAuthenticationLoading ? "Loading..." : "Enable"}</Button>
                    </div>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Setup;
