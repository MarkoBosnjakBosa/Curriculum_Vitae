import { get, set } from "../../utilities/language";
import americanFlag from "../../../utilities/assets/americanFlag.png";
import germanFlag from "../../../utilities/assets/germanFlag.png";
import style from "../../App.module.css";

const Language = () => {
  const { isGerman } = get();

  return (
    <img src={isGerman ? americanFlag : germanFlag} alt={`${isGerman ? "American" : "German"} flag`} className={`${style.fullHeight} ${style.pointer}`} onClick={() => set(isGerman ? false : true)} />
  );
};

export default Language;
