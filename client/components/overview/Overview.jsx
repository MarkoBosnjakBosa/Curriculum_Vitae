import { useNavigate } from "react-router-dom";
import Link from "../actions/Link";
import defaultStyle from "../../App.module.css";
import style from "./Overview.module.css";
import { Button } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Edit } from "@mui/icons-material";
import "@fortawesome/fontawesome-free/css/all.css";

const Overview = (props) => {
  const { user } = props;
  const navigate = useNavigate();

  return (
    <>
      <h1 className={defaultStyle.center}>Overview</h1>
      <Grid container className={`${defaultStyle.auto} ${defaultStyle.mediumContent}`}>
        <Grid xs={12} sm={12} md={6} lg={6} className={`${defaultStyle.borderRadius} ${defaultStyle.marginBottom} ${style.information}`}>
          <div className={style.padding}>
            <Grid container className={style.row}>
              <Grid xs={1}><i className="fas fa-user" /></Grid>
              <Grid xs={11}>{user.username}</Grid>
            </Grid>
            <Grid container className={style.row}>
              <Grid xs={1}><i className="fas fa-pen" /></Grid>
              <Grid xs={11}>{user.firstName}</Grid>
            </Grid>
            <Grid container className={style.row}>
              <Grid xs={1}><i className="fas fa-pen" /></Grid>
              <Grid xs={11}>{user.lastName}</Grid>
            </Grid>
            <Grid container className={style.row}>
              <Grid xs={1}><i className="fas fa-envelope" /></Grid>
              <Grid xs={11}><Link value={user.email} /></Grid>
            </Grid>
            <Grid container className={style.row}>
              <Grid xs={1}><i className="fas fa-mobile-alt" /></Grid>
              <Grid xs={11}><Link value={user.telephone} /></Grid>
            </Grid>
            <Grid container className={style.row}>
              <Grid xs={1}><i className="fas fa-birthday-cake" /></Grid>
              <Grid xs={11}>{user.birthday}</Grid>
            </Grid>
            <Grid container className={style.row}>
              <Grid xs={1}><i className="fas fa-birthday-cake" /></Grid>
              <Grid xs={11}>{user.birthday_de}</Grid>
            </Grid>
            <Grid container className={style.row}>
              <Grid xs={1}><i className="fas fa-location-arrow" /></Grid>
              <Grid xs={11}><Link value={user.address} /></Grid>
            </Grid>
            <Grid container className={style.row}>
              <Grid xs={1}><i className="fas fa-location-arrow" /></Grid>
              <Grid xs={11}><Link value={user.address_de} /></Grid>
            </Grid>
            <Grid container className={style.row}>
              <Grid xs={1}><i className="fas fa-globe" /></Grid>
              <Grid xs={11}>{user.languages}</Grid>
            </Grid>
            <Grid container className={style.row}>
              <Grid xs={1}><i className="fas fa-globe" /></Grid>
              <Grid xs={11}>{user.languages_de}</Grid>
            </Grid>
            <Grid container className={style.row}>
              <Grid xs={1}><i className="fas fa-laptop-code" /></Grid>
              <Grid xs={11}>{user.profession}</Grid>
            </Grid>
            <Grid container className={style.row}>
              <Grid xs={1}><i className="fas fa-laptop-code" /></Grid>
              <Grid xs={11}>{user.profession_de}</Grid>
            </Grid>
            <Grid container className={style.row}>
              <Grid xs={1}><i className="fab fa-linkedin-in" /></Grid>
              <Grid xs={11}><Link value={user.linkedIn} /></Grid>
            </Grid>
            <Grid container className={style.row}>
              <Grid xs={1}><i className="fab fa-xing" /></Grid>
              <Grid xs={11}><Link value={user.xing} /></Grid>
            </Grid>
            <Grid container className={style.row}>
              <Grid xs={1}><i className="fab fa-github" /></Grid>
              <Grid xs={11}><Link value={user.gitHub} /></Grid>
            </Grid>
          </div>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={6} className={`${defaultStyle.noPadding} ${defaultStyle.marginBottom}`}>
          <img src={user.avatar.data} alt={user.avatar.name} className={`${defaultStyle.fullWidth} ${defaultStyle.borderRadius} ${style.image}`} />
        </Grid>
      </Grid>
      <div className={`${defaultStyle.center} ${defaultStyle.marginBottom}`}>
        <Button variant="contained" endIcon={<Edit />} onClick={() => navigate("/profile")}>Edit</Button>
      </div>
    </>
  );
};

export default Overview;
