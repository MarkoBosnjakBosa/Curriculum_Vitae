import { useLoaderData } from "react-router-dom";
import { checkAuthentication, getData } from "../utilities/api";
import Skills from "../components/skills/Skills";
import NavigationLayout from "../components/layouts/NavigationLayout";
import MessageLayout from "../components/layouts/MessageLayout";

const SkillsPage = () => {
  const data = useLoaderData();
  const { isLoggedIn } = data;

  return (
    isLoggedIn ? (
      <>
        <NavigationLayout />
        <Skills skills={data.skills} />
      </>
    ) : (
      <MessageLayout message="No permission!" isAlone />
    )
  );
};

export default SkillsPage;

export const loader = async () => {
  const isLoggedIn = await checkAuthentication();
  if (!isLoggedIn) return { isLoggedIn };
  const skills = await getData(`${window.location.origin}/getSkills`);
  return { isLoggedIn, skills };
};
