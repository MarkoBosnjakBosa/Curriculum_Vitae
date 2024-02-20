import { useLoaderData } from "react-router-dom";
import { checkAuthentication } from "../utilities/api";
import Password from "../components/profile/Password";
import NavigationLayout from "../components/layouts/NavigationLayout";
import MessageLayout from "../components/layouts/MessageLayout";

const PasswordPage = () => {
  const data = useLoaderData();
  const { isLoggedIn } = data;

  return (
    isLoggedIn ? (
      <>
        <NavigationLayout />
        <Password />
      </>
    ) : (
      <MessageLayout message="No permission!" isAlone />
    )
  );
};

export default PasswordPage;

export const loader = async () => {
  const isLoggedIn = await checkAuthentication();
  return { isLoggedIn };
};
