import { useState } from "react";
import { validArray } from "../../../utilities/validations";
import constants from "../../../utilities/constants";
import Contact from "./Contact";
import SearchLayout from "../layouts/SearchLayout";
import TableLayout from "../layouts/TableLayout";
import NoValuesLayout from "../layouts/NoValuesLayout";
import defaultStyle from "../../App.module.css";

const ContactsTable = (props) => {
  const { contacts, user, onCompleteEdit, onCompleteDeletion } = props;
  const [search, setSearch] = useState("");

  return (
    <div className={`${defaultStyle.auto} ${defaultStyle.bigContent}`}>
      {validArray(contacts) ? (
        <>
          <SearchLayout onSearch={setSearch} />
          <TableLayout labels={constants.CONTACTS_LABELS} usePaging>
            {contacts.filter((contact) => contact.name.toLowerCase().includes(search) || contact.email.toLowerCase().includes(search) || contact.subject.toLowerCase().includes(search) || contact.message.toLowerCase().includes(search)).map((contact, index) => (
              <Contact key={`${contact._id}_${new Date().getTime()}`} contact={contact} user={user} index={++index} onCompleteEdit={onCompleteEdit} onCompleteDeletion={onCompleteDeletion} />
            ))}
          </TableLayout>
        </>
      ) : (
        <NoValuesLayout message="No contacts found!" />
      )}
    </div>
  );
};

export default ContactsTable;
