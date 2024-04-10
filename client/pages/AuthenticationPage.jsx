import { get } from "../utilities/authentication";
import { validUsername, validText, validObjectId } from "../../utilities/validations";
import Authentication from "../components/login/Authentication";
import MessageLayout from "../components/layouts/MessageLayout";

const AuthenticationPage = () => {
  const { token, userId, username } = get();

  return (
    <>
      {(validObjectId(userId) && validUsername(username) && !validText(token)) ? (
        <Authentication userId={userId} username={username} />
      ) : (
        <MessageLayout message="You are not able to authenticate right now!" isAlone />
      )}
    </>
  );
};

export default AuthenticationPage;
