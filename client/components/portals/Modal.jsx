import ReactDOM from "react-dom";
import defaultStyle from "../../App.module.css";
import style from "./Modal.module.css";

const Backdrop = (props) => {
  const { onManage } = props;

  return (
    <div className={`${defaultStyle.fullHeight} ${defaultStyle.fullWidth} ${defaultStyle.pointer} ${style.backdrop} ${style.fixed}`} onClick={onManage} />
  );
};

const Preview = (props) => {
  const { data, name } = props;

  return (
    <img src={data} alt={name} className={`${style.image} ${style.fixed}`} />
  );
};

const Modal = (props) => {
  const { data, name, onManage } = props;

  return (
    <>
      {ReactDOM.createPortal(<Backdrop onManage={onManage} />, document.getElementById("backdrop"))}
      {ReactDOM.createPortal(<Preview data={data} name={name} />, document.getElementById("preview"))}
    </>
  );
};

export default Modal;
