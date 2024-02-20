import { useState } from "react";
import { get } from "../../utilities/language";
import defaultStyle from "../../App.module.css";
import style from "./Layouts.module.css";
import { Grid, Button } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

const CarouselLayout = (props) => {
  const { references } = props;
  const length = references.length;
  const [step, setStep] = useState(0);
  const { isGerman } = get();

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={2} lg={2} className={style.reference}>
        <img src={references[step].logo.data} alt={references[step].logo.name} className={`${defaultStyle.fullWidth} ${style.image}`} />
      </Grid>
      <Grid item xs={12} sm={12} md={10} lg={10} className={style.second}>
        <div className={`${defaultStyle.fontSize} ${style.title}`}>{isGerman ? references[step].title_de : references[step].title}</div>
        <div className={`${defaultStyle.center} ${defaultStyle.marginTop}`}>
          <Button color="success" size="small" onClick={() => setStep((previousStep) => previousStep - 1)} disabled={step === 0}><KeyboardArrowLeft /></Button>
          {`${step + 1} / ${length}`}
          <Button color="success" size="small" onClick={() => setStep((previousStep) => previousStep + 1)} disabled={(step + 1) === length}><KeyboardArrowRight /></Button>
        </div>
      </Grid>
    </Grid>
  );
};

export default CarouselLayout;
