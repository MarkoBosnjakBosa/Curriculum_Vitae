import { redirect } from "react-router-dom";
import { checkAuthentication } from "../utilities/api";
import Login from "../components/login/Login";

const LoginPage = () => {
  return (
    <Login />
  );
};

export default LoginPage;

export const loader = async () => {
  const isLoggedIn = await checkAuthentication();
  if (isLoggedIn) return redirect("/overview");
  return true;
};
