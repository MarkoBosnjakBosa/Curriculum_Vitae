import defaultStyle from "../../App.module.css";

const NoValuesLayout = (props) => {
  const { message } = props;

  return (
    <div className={`${defaultStyle.center} ${defaultStyle.marginTop} ${defaultStyle.marginBottom}`}><strong>{message}</strong></div>
  );
};

export default NoValuesLayout;
