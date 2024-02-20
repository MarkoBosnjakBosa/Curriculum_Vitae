import { get } from "../../utilities/language";
import WrapperLayout from "./WrapperLayout";
import defaultStyle from "../../App.module.css";
import style from "./Layouts.module.css";
import Grid from "@mui/material/Unstable_Grid2";

const DataLayout = (props) => {
  const { resume } = props;
  const { isGerman } = get();

  return (
    resume.map((resumeItem) => (
      <WrapperLayout key={resumeItem._id}>
        <Grid container className={defaultStyle.marginBottom}>
          <Grid xs={12} sm={12} md={2} lg={2} className={`${defaultStyle.center} ${defaultStyle.white} ${defaultStyle.green} ${style.first}`}>
            <p>{isGerman ? resumeItem.duration_de : resumeItem.duration}</p>
            <div>{isGerman ? resumeItem.workPlace_de : resumeItem.workPlace}</div>
          </Grid>
          <Grid xs={12} sm={12} md={10} lg={10} className={style.second}>
            <div className={`${defaultStyle.fontSize} ${style.title}`}>{isGerman ? resumeItem.title_de : resumeItem.title}</div>
            <div>{isGerman ? resumeItem.description_de : resumeItem.description}</div>
          </Grid>
        </Grid>
      </WrapperLayout>
    ))
  );
};

export default DataLayout;
