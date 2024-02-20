import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { checkAuthentication, getData } from "../utilities/api";
import { get } from "../utilities/authentication";
import Profile from "../components/profile/Profile";
import NavigationLayout from "../components/layouts/NavigationLayout";
import MessageLayout from "../components/layouts/MessageLayout";

const ProfilePage = () => {
  const data = useLoaderData();
  const { isLoggedIn } = data;
  const [user, setUser] = useState(data.user);

  const changeAvatar = (newAvatar) => setUser((previousUser) => ({ ...previousUser, avatar: newAvatar }));

  return (
    isLoggedIn ? (
      <>
        <NavigationLayout key={new Date().getTime()} avatar={user.avatar} />
        <Profile user={user} onUpload={changeAvatar} />
      </>
    ) : (
      <MessageLayout message="No permission!" isAlone />
    )
  );
};

export default ProfilePage;

export const loader = async () => {
  const isLoggedIn = await checkAuthentication();
  if (!isLoggedIn) return { isLoggedIn, user: {} };
  const { userId } = get();
  const user = await getData(`${window.location.origin}/getProfile/${userId}`);
  return { isLoggedIn, user };
};
