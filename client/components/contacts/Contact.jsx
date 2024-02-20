import constants from "../../../utilities/constants";
import Answer from "../actions/Answer";
import Delete from "../actions/Delete";
import Link from "../actions/Link";
import style from "./Contacts.module.css";
import americanFlag from "../../../utilities/assets/americanFlag.png";
import germanFlag from "../../../utilities/assets/germanFlag.png";
import { TableRow, TableCell } from "@mui/material";

const Contact = (props) => {
  const { contact, user, index, onCompleteEdit, onCompleteDeletion } = props;

  return (
    <TableRow>
      <TableCell align="right">{index}</TableCell>
      <TableCell align="right"><img src={contact.isGerman ? germanFlag : americanFlag} alt={`${contact.isGerman ? "German" : "American"} flag`} className={style.image} /></TableCell>
      <TableCell align="right">{contact.name}</TableCell>
      <TableCell align="right"><Link value={contact.email} subject={`?subject=${user.firstName} ${user.lastName} - ${new Date(contact.date).toLocaleString(contact.isGerman ? "de-DE" : "en-US", constants.DATE_TIME_FORMAT)}`} /></TableCell>
      <TableCell align="right">{contact.subject}</TableCell>
      <TableCell align="right">{contact.message}</TableCell>
      <TableCell align="right">{new Date(contact.date).toLocaleString("de-DE", constants.DATE_TIME_FORMAT)}</TableCell>
      <TableCell align="right"><Answer contactId={contact._id} isAnswered={contact.isAnswered} onCompleteEdit={() => onCompleteEdit(contact._id, contact.name)} /></TableCell>
      <TableCell align="right"><Delete route={`/deleteContact/${contact._id}`} message={`Delete contact ${contact.name}?`} onCompleteDeletion={() => onCompleteDeletion(contact._id, contact.name)} /></TableCell>
    </TableRow>
  );
};

export default Contact;
