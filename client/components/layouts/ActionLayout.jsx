import { validEmail, validLink } from "../../../utilities/validations";
import defaultStyle from "../../App.module.css";
import style from "./Layouts.module.css";

const ActionLayout = (props) => {
  const { icon, value, onClick } = props;

  return (
    validEmail(value) ? (
      <a href={`mailto:${value}`} className={`${defaultStyle.relative} ${defaultStyle.display} ${defaultStyle.white} ${defaultStyle.pointer} ${style.action}`}>
        <i className={`${icon} ${defaultStyle.absolute} ${defaultStyle.corner} ${style.icon}`} />
      </a>
    ) : (validLink(value)) ? (
      <a href={value} target="_blank" className={`${defaultStyle.relative} ${defaultStyle.display} ${defaultStyle.white} ${defaultStyle.pointer} ${style.action}`}>
        <i className={`${icon} ${defaultStyle.absolute} ${defaultStyle.corner} ${style.icon}`} />
      </a>
    ) : (
      <div className={`${defaultStyle.relative} ${defaultStyle.display} ${defaultStyle.white} ${defaultStyle.pointer} ${style.action}`} onClick={onClick}>
        <i className={`${icon} ${defaultStyle.absolute} ${defaultStyle.corner} ${style.icon}`} />
      </div>
    )
  );
};

export default ActionLayout;
