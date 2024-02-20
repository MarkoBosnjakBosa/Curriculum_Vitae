import { forwardRef } from "react";
import defaultStyle from "../../App.module.css";

const TitleLayout = forwardRef((props, ref) => {
  const { title, customization } = props;

  return (
    <div ref={ref} className={`${defaultStyle.bold} ${defaultStyle.fontSize} ${defaultStyle.center} ${customization}`}>{title}</div>
  );
});

export default TitleLayout;
