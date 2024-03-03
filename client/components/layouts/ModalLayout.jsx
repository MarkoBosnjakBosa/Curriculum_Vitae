import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Check, Close } from "@mui/icons-material";

const ModalLayout = (props) => {
  const { title, isValid, isLoading, onClose, onSave, children } = props;

  return (
    <Dialog open fullWidth maxWidth="md" onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button type="button" endIcon={<Close />} onClick={onClose} disabled={isLoading}>Cancel</Button>
        <Button type="button" variant="contained" endIcon={<Check />} onClick={onSave} disabled={!isValid || isLoading}>{isLoading ? "Loading..." : "Save"}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalLayout;
