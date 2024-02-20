import { useState } from "react";
import Information from "./Information";
import Avatar from "./Avatar";
import NotificationLayout from "../layouts/NotificationLayout";
import defaultStyle from "../../App.module.css";
import Grid from "@mui/material/Unstable_Grid2";

const Profile = (props) => {
  const { onUpload } = props;
  const [user, setUser] = useState(props.user);
  const [saved, setSaved] = useState("");

  const editProfile = (newProfile) => {
    setUser(newProfile);
    displayMessage("information");
  };

  const editAvatar = (newAvatar) => {
    setUser((previousUser) => ({ ...previousUser, avatar: newAvatar }));
    displayMessage("avatar");
    onUpload(newAvatar);
  };

  const displayMessage = (title) => setSaved(`The ${title} has been successfully saved!`);

  return (
    <>
      <h1 className={defaultStyle.center}>Profile</h1>
      <Grid container className={`${defaultStyle.auto} ${defaultStyle.mediumContent}`}>
        <Grid xs={12} sm={12} md={8} lg={8}>
          <Information user={user} onEdit={editProfile} />
        </Grid>
        <Grid xs={12} sm={12} md={4} lg={4} className={defaultStyle.center}>
          <Avatar userId={user._id} avatar={user.avatar} onUpload={editAvatar} />
        </Grid>
      </Grid>
      {saved && (
        <NotificationLayout onClose={() => setSaved("")}>{saved}</NotificationLayout>
      )}
    </>
  );
};

export default Profile;
