import { useLoaderData } from "react-router-dom";
import { checkAuthentication, getData } from "../utilities/api";
import { get } from "../utilities/authentication";
import Overview from "../components/overview/Overview";
import NavigationLayout from "../components/layouts/NavigationLayout";
import MessageLayout from "../components/layouts/MessageLayout";

const OverviewPage = () => {
  const data = useLoaderData();
  const { isLoggedIn } = data;

  return (
    isLoggedIn ? (
      <>
        <NavigationLayout />
        <Overview user={data.user} />
      </>
    ) : (
      <MessageLayout message="No permission!" isAlone />
    )
  );
};

export default OverviewPage;

export const loader = async () => {
  const isLoggedIn = await checkAuthentication();
  if (!isLoggedIn) return { isLoggedIn };
  const { userId } = get();
  const user = await getData(`${window.location.origin}/getProfile/${userId}`);
  return { isLoggedIn, user };
};
