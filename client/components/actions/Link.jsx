import { validEmail, validTelephone, validLink, validText } from "../../../utilities/validations";
import style from "../../App.module.css";

const Link = (props) => {
  const { value, subject, customization, children } = props;

  return (
    validEmail(value) ? (
      <a href={`mailto:${value}${subject || ""}`} className={`${style.noLink} ${customization}`}>{value}</a>
    ) : (validTelephone(value)) ? (
      <a href={`tel:+${value}`} className={`${style.noLink} ${customization}`}>+{value}</a>
    ) : (validLink(value)) ? (
      <a href={value} target="_blank" className={`${style.noLink} ${customization}`}>{children || value}</a>
    ) : (validText) ? (
      <a href={`https://maps.google.com/?q=${value}`} target="_blank" className={`${style.noLink} ${customization}`}>{value}</a>
    ) : (
      ""
    )
  );
};

export default Link;
