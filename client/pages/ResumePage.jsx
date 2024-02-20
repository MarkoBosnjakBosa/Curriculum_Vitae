import { useLoaderData } from "react-router-dom";
import { checkAuthentication, getData } from "../utilities/api";
import Resume from "../components/resume/Resume";
import NavigationLayout from "../components/layouts/NavigationLayout";
import MessageLayout from "../components/layouts/MessageLayout";

const ResumePage = () => {
  const data = useLoaderData();
  const { isLoggedIn } = data;

  return (
    isLoggedIn ? (
      <>
        <NavigationLayout />
        <Resume experienceResume={data.experienceResume} educationResume={data.educationResume} />
      </>
    ) : (
      <MessageLayout message="No permission!" isAlone />
    )
  );
};

export default ResumePage;

export const loader = async () => {
  const isLoggedIn = await checkAuthentication();
  if (!isLoggedIn) return { isLoggedIn };
  const { experienceResume, educationResume } = await getData(`${window.location.origin}/getResume`);
  return { isLoggedIn, experienceResume, educationResume };
};
