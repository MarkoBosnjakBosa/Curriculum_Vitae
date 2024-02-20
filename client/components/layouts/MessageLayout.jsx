import defaultStyle from "../../App.module.css";
import { Alert, AlertTitle } from "@mui/material";

const MessageLayout = (props) => {
  const { message, isGerman, isAlone, onClose } = props;

  return (
    <>
      {onClose ? (
        <Alert severity="success" className={`${defaultStyle.marginBottom}`} onClose={onClose}>
          <AlertTitle><strong>{isGerman ? "Erfolg" : "Success"}</strong></AlertTitle>
          <strong>{message}</strong>
        </Alert>
      ) : (
        <Alert severity="error" className={`${defaultStyle.marginBottom} ${isAlone ? [defaultStyle.auto, defaultStyle.smallContent, defaultStyle.marginTop].join(" ") : ""}`}>
          <AlertTitle><strong>{isGerman ? "Fehler" : "Error"}</strong></AlertTitle>
          <strong>{message}</strong>
        </Alert>
      )}
    </>
  );
};

export default MessageLayout;
