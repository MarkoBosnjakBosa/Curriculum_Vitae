import { useLoaderData } from "react-router-dom";
import { get } from "../utilities/authentication";
import { validText, validObjectId } from "../../utilities/validations";
import Authentication from "../components/login/Authentication";
import MessageLayout from "../components/layouts/MessageLayout";

const AuthenticationPage = () => {
  const data = useLoaderData();
  const { token, userId } = data;

  return (
    <>
      {(validObjectId(userId) && !validText(token)) ? (
        <Authentication userId={userId} />
      ) : (
        <MessageLayout message="You are not able to authenticate right now!" isAlone />
      )}
    </>
  );
};

export default AuthenticationPage;

export const loader = () => {
  const { token, userId } = get();
  return { token, userId };
};
