import { forwardRef } from "react";
import { getString } from "../../utilities/i18n";
import TitleLayout from "../layouts/TitleLayout";
import WrapperLayout from "../layouts/WrapperLayout";
import defaultStyle from "../../App.module.css";
import style from "./About.module.css";
import Grid from "@mui/material/Unstable_Grid2";

const Skills = forwardRef((props, ref) => {
  const { skills } = props;

  return (
    <>
      <TitleLayout ref={ref} title={getString("cv.sections.skills")} customization={defaultStyle.sectionMarginTop} />
      <WrapperLayout>
        <div className={style.skills}>
          <Grid container spacing={4}>
            {skills.map((skill) => (
              <Grid key={skill._id} xs={12} sm={12} md={6} lg={6}>
                <div className={`${style.skill} ${style.green}`}>
                  <span>{skill.title}</span>
                  <div className={`${defaultStyle.green} ${style.bar}`} />
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
      </WrapperLayout>
    </>
  );
});

export default Skills;
