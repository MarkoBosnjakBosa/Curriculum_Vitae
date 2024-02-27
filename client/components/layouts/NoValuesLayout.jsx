import style from "../../App.module.css";

const NoValuesLayout = (props) => {
  const { message } = props;

  return (
    <div className={`${style.center} ${style.marginTop} ${style.marginBottom}`}><strong>{message}</strong></div>
  );
};

export default NoValuesLayout;
