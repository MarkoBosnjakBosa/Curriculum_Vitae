import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

const ModalLayout = (props) => {
  const { title, isValid, isLoading, onClose, onSave, children } = props;

  return (
    <Dialog open fullWidth maxWidth="md" onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isLoading}>Cancel</Button>
        <Button variant="contained" onClick={onSave} disabled={!isValid || isLoading}>{isLoading ? "Loading..." : "Save"}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalLayout;
