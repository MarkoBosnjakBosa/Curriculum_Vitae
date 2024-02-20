import { useLoaderData } from "react-router-dom";
import { checkAuthentication, getData } from "../utilities/api";
import Contacts from "../components/contacts/Contacts";
import NavigationLayout from "../components/layouts/NavigationLayout";
import MessageLayout from "../components/layouts/MessageLayout";

const ContactsPage = () => {
  const data = useLoaderData();
  const { isLoggedIn } = data;

  return (
    isLoggedIn ? (
      <>
        <NavigationLayout />
        <Contacts contacts={data.contacts} user={data.user} />
      </>
    ) : (
      <MessageLayout message="No permission!" isAlone />
    )
  );
};

export default ContactsPage;

export const loader = async () => {
  const isLoggedIn = await checkAuthentication();
  if (!isLoggedIn) return { isLoggedIn };
  const { contacts, user } = await getData(`${window.location.origin}/getContacts`);
  return { isLoggedIn, contacts, user };
};
