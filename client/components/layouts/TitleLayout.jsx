import { forwardRef } from "react";
import style from "../../App.module.css";

const TitleLayout = forwardRef((props, ref) => {
  const { title, customization } = props;

  return (
    <div ref={ref} className={`${style.bold} ${style.fontSize} ${style.center} ${customization}`}>{title}</div>
  );
});

export default TitleLayout;
