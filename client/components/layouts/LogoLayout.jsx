import { validFile, validMimeType, validObject, validArray } from "../../../utilities/validations";
import defaultStyle from "../../App.module.css";
import style from "./Layouts.module.css";

const LogoLayout = (props) => {
  const { logo, required, onUpload } = props;

  const uploadLogo = (event) => {
    const files = event.target.files;
    if (validArray(files)) {
      const file = files[0];
      if (validFile(file)) {
        const mimeType = file.type;
        if (validMimeType(mimeType)) {
          const fileReader = new FileReader();
          fileReader.onload = () => {
            const logo = { name: file.name, mimeType, data: fileReader.result };
            onUpload(logo);
          }
          fileReader.readAsDataURL(file);
        }
      }
    }
    document.getElementById("logo").value = null;
  };

  return (
    <div className={defaultStyle.center}>
      {validObject(logo) ? (
        <div><img src={logo.data} alt={logo.name} className={style.logo} /></div>
      ) : ("")}
      <label htmlFor="logo" className={`${defaultStyle.label} ${defaultStyle.display} ${defaultStyle.pointer} ${defaultStyle.width}`}><i className="fas fa-cloud-upload-alt"></i> <strong>Logo {required && ("*")}</strong></label>
      <input type="file" id="logo" accept="image/*" className={defaultStyle.none} onChange={uploadLogo} />
    </div>
  );
};

export default LogoLayout;
