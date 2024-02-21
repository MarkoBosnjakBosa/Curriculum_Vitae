import { useState } from "react";
import { validText } from "../../../utilities/validations";
import constants from "../../../utilities/constants";
import ContactsTable from "./ContactsTable";
import NotificationLayout from "../layouts/NotificationLayout";
import style from "../../App.module.css";

const Contacts = (props) => {
  const { user } = props;
  const [contacts, setContacts] = useState(props.contacts);
  const [message, setMessage] = useState("");

  const completeEdit = (contactId, name) => {
    setContacts((previousContacts) => previousContacts.map((contact) => (contact._id === contactId) ? { ...contact, isAnswered: !contact.isAnswered } : contact));
    displayMessage(name, constants.EDITED_ACTION);
  };

  const completeDeletion = (contactId, name) => {
    setContacts((previousContacts) => previousContacts.filter((contact) => contact._id !== contactId));
    displayMessage(name, constants.DELETED_ACTION);
  };

  const displayMessage = (name, action) => setMessage(`Contact ${name} has been successfully ${action}!`);

  return (
    <>
      <h1 className={style.center}>Contacts</h1>
      <ContactsTable contacts={contacts} user={user} onCompleteEdit={completeEdit} onCompleteDeletion={completeDeletion} />
      {validText(message) && (
        <NotificationLayout onClose={() => setMessage("")}>{message}</NotificationLayout>
      )}
    </>
  );
};

export default Contacts;
