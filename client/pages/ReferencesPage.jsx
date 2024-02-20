import { useLoaderData } from "react-router-dom";
import { checkAuthentication, getData } from "../utilities/api";
import References from "../components/references/References";
import NavigationLayout from "../components/layouts/NavigationLayout";
import MessageLayout from "../components/layouts/MessageLayout";

const ReferencesPage = () => {
  const data = useLoaderData();
  const { isLoggedIn } = data;

  return (
    isLoggedIn ? (
      <>
        <NavigationLayout />
        <References certifications={data.certifications} customers={data.customers} />
      </>
    ) : (
      <MessageLayout message="No permission!" isAlone />
    )
  );
};

export default ReferencesPage;

export const loader = async () => {
  const isLoggedIn = await checkAuthentication();
  if (!isLoggedIn) return { isLoggedIn };
  const { certifications, customers } = await getData(`${window.location.origin}/getReferences`);
  return { isLoggedIn, certifications, customers };
};
