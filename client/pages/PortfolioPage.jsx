import { useLoaderData } from "react-router-dom";
import { checkAuthentication, getData } from "../utilities/api";
import Portfolio from "../components/portfolio/Portfolio";
import NavigationLayout from "../components/layouts/NavigationLayout";
import MessageLayout from "../components/layouts/MessageLayout";

const PortfolioPage = () => {
  const data = useLoaderData();
  const { isLoggedIn } = data;

  return (
    isLoggedIn ? (
      <>
        <NavigationLayout />
        <Portfolio workPortfolio={data.workPortfolio} personalPortfolio={data.personalPortfolio} academicPortfolio={data.academicPortfolio} />
      </>
    ) : (
      <MessageLayout message="No permission!" isAlone />
    )
  );
};

export default PortfolioPage;

export const loader = async () => {
  const isLoggedIn = await checkAuthentication();
  if (!isLoggedIn) return { isLoggedIn };
  const { workPortfolio, personalPortfolio, academicPortfolio } = await getData(`${window.location.origin}/getPortfolio`);
  return { isLoggedIn, workPortfolio, personalPortfolio, academicPortfolio };
};
