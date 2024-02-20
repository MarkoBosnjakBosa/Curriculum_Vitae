import { useState, forwardRef } from "react";
import { getString } from "../../utilities/i18n";
import TitleLayout from "../layouts/TitleLayout";
import WrapperLayout from "../layouts/WrapperLayout";
import ImagesLayout from "../layouts/ImagesLayout";
import defaultStyle from "../../App.module.css";
import { ImageList, useMediaQuery } from "@mui/material";

const Portfolio = forwardRef((props, ref) => {
  const { workPortfolio, personalPortfolio, academicPortfolio } = props;
  const [step, setStep] = useState(0);
  const mediaQuery = useMediaQuery("(min-width: 600px)");

  return (
    <>
      <TitleLayout ref={ref} title={getString("cv.sections.portfolio")} customization={defaultStyle.sectionMarginTop} />
      <WrapperLayout hasActions onChangeStep={setStep}>
        <ImageList cols={mediaQuery ? 2 : 1}>
          {(step === 0) ? (
            <ImagesLayout portfolio={workPortfolio} type={getString("cv.projects.work")} />
          ) : (step === 1) ? (
            <ImagesLayout portfolio={personalPortfolio} type={getString("cv.projects.personal")} />
          ) : (
            <ImagesLayout portfolio={academicPortfolio} type={getString("cv.projects.academic")} />
          )}
        </ImageList>
      </WrapperLayout>
    </>
  );
});

export default Portfolio;
