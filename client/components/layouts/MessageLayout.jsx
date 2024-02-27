import style from "../../App.module.css";
import { Alert, AlertTitle } from "@mui/material";

const MessageLayout = (props) => {
  const { message, isGerman, isAlone, onClose } = props;

  return (
    <>
      {onClose ? (
        <Alert severity="success" className={`${style.marginBottom}`} onClose={onClose}>
          <AlertTitle><strong>{isGerman ? "Erfolg" : "Success"}</strong></AlertTitle>
          <strong>{message}</strong>
        </Alert>
      ) : (
        <Alert severity="error" className={`${style.marginBottom} ${isAlone ? [style.auto, style.smallContent, style.marginTop].join(" ") : ""}`}>
          <AlertTitle><strong>{isGerman ? "Fehler" : "Error"}</strong></AlertTitle>
          <strong>{message}</strong>
        </Alert>
      )}
    </>
  );
};

export default MessageLayout;
