import { forwardRef } from "react";
import { get } from "../../utilities/language";
import { getString } from "../../utilities/i18n";
import constants from "../../../utilities/constants";
import PdfExport from "../export/PdfExport";
import Link from "../actions/Link";
import ActionLayout from "../layouts/ActionLayout";
import WrapperLayout from "../layouts/WrapperLayout";
import defaultStyle from "../../App.module.css";
import style from "./About.module.css";
import Grid from "@mui/material/Unstable_Grid2";
import "@fortawesome/fontawesome-free/css/all.css";

const Profile = forwardRef((props, ref) => {
  const { user, skills, experienceResume, educationResume, certifications, onScroll } = props;
  const { isGerman } = get();

  return (
    <>
      <div ref={ref} className={`${defaultStyle.relative} ${defaultStyle.text} ${style.profile}`}>
        <div className={`${defaultStyle.absolute} ${defaultStyle.fullWidth} ${defaultStyle.fullHeight} ${style.bridge}`} />
        <div className={`${defaultStyle.relative} ${defaultStyle.fullHeight} ${style.zIndex}`}>
          <div className={`${defaultStyle.absolute} ${defaultStyle.center} ${defaultStyle.corner} ${style.content}`}>
            <div className={`${defaultStyle.relative} ${defaultStyle.marginBottom} ${style.avatar}`}>
              <img src={user.avatar.data} alt={user.avatar.name} className={`${defaultStyle.relative} ${defaultStyle.circle} ${style.image}`} />
            </div>
            <div className={`${defaultStyle.white} ${defaultStyle.bold} ${style.name}`}>{user.firstName} {user.lastName}</div>
            <p className={`${style.profession} ${defaultStyle.white} ${defaultStyle.bold} ${defaultStyle.uppercase}`}>{isGerman ? user.profession_de : user.profession}</p>
            <a className={`${defaultStyle.button} ${defaultStyle.display} ${defaultStyle.white} ${defaultStyle.green} ${defaultStyle.pointer}`} onClick={() => onScroll(constants.ABOUT_SECTIONS[7])}>{getString("cv.sections.contact")}</a>
            <PdfExport user={user} skills={skills} experienceResume={experienceResume} educationResume={educationResume} certifications={certifications} />
          </div>
        </div>
        <div className={`${defaultStyle.relative} ${defaultStyle.fullHeight} ${style.zIndex}`}>
          <div className={`${defaultStyle.center} ${style.actions}`}>
            <ActionLayout icon="fab fa-linkedin-in" value={user.linkedIn} />
            <ActionLayout icon="fab fa-xing" value={user.xing} />
            <ActionLayout icon="fab fa-github" value={user.gitHub} />
            <ActionLayout icon="fab fa-yahoo" value={user.email} />
          </div>
        </div>
      </div>
      <WrapperLayout>
        <Grid container className={defaultStyle.text}>
          <Grid xs={12} sm={12} md={6} lg={6} className={style.item}>
            <div className={`${defaultStyle.fontSize} ${defaultStyle.bold}`}>{getString("cv.titles.information")}</div>
            <div className={`${style.paragraph} ${style.space}`}>
              <Grid container>
                <Grid xs={12} sm={3} className={`${defaultStyle.bold} ${defaultStyle.uppercase}`}>{getString("cv.information.birthday")}:</Grid>
                <Grid xs={12} sm={9}>{isGerman ? user.birthday_de : user.birthday}</Grid>
              </Grid>
              <Grid container className={style.marginTop}>
                <Grid xs={12} sm={3} className={`${defaultStyle.bold} ${defaultStyle.uppercase}`}>{getString("cv.labels.email")}:</Grid>
                <Grid xs={12} sm={9}><Link value={user.email} customization={`${defaultStyle.relative} ${style.zIndex} ${style.green}`} /></Grid>
              </Grid>
              <Grid container className={style.marginTop}>
                <Grid xs={12} sm={3} className={`${defaultStyle.bold} ${defaultStyle.uppercase}`}>{getString("cv.information.telephone")}:</Grid>
                <Grid xs={12} sm={9}><Link value={user.telephone} customization={`${defaultStyle.relative} ${style.zIndex} ${style.green}`} /></Grid>
              </Grid>
              <Grid container className={style.marginTop}>
                <Grid xs={12} sm={3} className={`${defaultStyle.bold} ${defaultStyle.uppercase}`}>{getString("cv.information.address")}:</Grid>
                <Grid xs={12} sm={9}><Link value={isGerman ? user.address_de : user.address} customization={`${defaultStyle.relative} ${style.zIndex} ${style.green}`} /></Grid>
              </Grid>
              <Grid container className={style.marginTop}>
                <Grid xs={12} sm={3} className={`${defaultStyle.bold} ${defaultStyle.uppercase}`}>{getString("cv.information.languages")}:</Grid>
                <Grid xs={12} sm={9}>{isGerman ? user.languages_de : user.languages}</Grid>
              </Grid>
            </div>
          </Grid>
          <Grid xs={12} sm={12} md={6} lg={6} className={style.item}>
            <div className={`${defaultStyle.fontSize} ${defaultStyle.bold}`}>{getString("cv.sections.about")}</div>
            <p className={style.paragraph}>{getString("cv.paragraphs.first.part")} {user.firstName} {user.lastName}. {isGerman ? user.profession_de : user.profession}.</p>
            <p className={style.paragraph}>
              {getString("cv.paragraphs.second.part")}
              <Link value={user.gitHub} customization={`${defaultStyle.relative} ${style.zIndex} ${style.green}`}>GitHub</Link>
              {getString("cv.paragraphs.third.part")}
            </p>
          </Grid>
        </Grid>
      </WrapperLayout>
    </>
  );
});

export default Profile;
