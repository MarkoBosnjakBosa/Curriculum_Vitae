import ActionLayout from "./ActionLayout";
import defaultStyle from "../../App.module.css";
import style from "./Layouts.module.css";

const WrapperLayout = (props) => {
  const { hasActions, onChangeStep, children } = props;

  return (
    <div className={style.wrapper}>
      {hasActions && (
        <div className={`${defaultStyle.center} ${style.marginTop}`}>
          <ActionLayout icon="fab fa-atlassian" onClick={() => onChangeStep(0)} />
          <ActionLayout icon="fab fa-node-js" onClick={() => onChangeStep(1)} />
          <ActionLayout icon="fab fa-php" onClick={() => onChangeStep(2)} />
        </div>
      )}
      <div className={`${defaultStyle.auto} ${defaultStyle.sectionMarginTop} ${style.section}`}>{children}</div>
    </div>
  );
};

export default WrapperLayout;
