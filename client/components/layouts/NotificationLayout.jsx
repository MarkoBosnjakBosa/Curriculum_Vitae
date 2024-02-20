import { forwardRef } from "react";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef((props, ref) => {
  return (
    <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
  );
});

const NotificationLayout = (props) => {
  const { isError, onClose, children } = props;

  return (
    <Snackbar open anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
      {isError ? (
        <Alert severity="error" sx={{ width: "100%" }}>{children}</Alert>
      ) : (
        <Alert severity="success" sx={{ width: "100%" }} onClose={onClose}>{children}</Alert>
      )}
    </Snackbar>
  );
};

export default NotificationLayout;
