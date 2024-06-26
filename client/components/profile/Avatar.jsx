import useHttp from "../../hooks/use-http";
import { validFile, validMimeType, validObject, validArray } from "../../../utilities/validations";
import NotificationLayout from "../layouts/NotificationLayout";
import defaultStyle from "../../App.module.css";
import style from "./Profile.module.css";

const Avatar = (props) => {
  const { userId, avatar, onUpload } = props;

  const { isLoading, error, sendRequest } = useHttp();

  const editAvatar = (event) => {
    const files = event.target.files;
    if (validArray(files)) {
      const file = files[0];
      if (validFile(file)) {
        const { type: mimeType } = file;
        if (validMimeType(mimeType)) {
          const fileReader = new FileReader();
          fileReader.onload = () => {
            const avatar = { name: file.name, mimeType, data: fileReader.result };
            sendRequest(
              {
                url: `${window.location.origin}/editAvatar/${userId}`,
                method: "PUT",
                body: JSON.stringify({ avatar }),
                authentication: true
              },
              onUpload
            );
          }
          fileReader.readAsDataURL(file);
        }
      }
    }
    document.getElementById("avatar").value = null;
  };

  return (
    <>
      {error && (
        <NotificationLayout isError>{error}</NotificationLayout>
      )}
      {validObject(avatar) ? (
        <img src={avatar.data} alt={avatar.name} className={`${defaultStyle.marginBottom} ${defaultStyle.width} ${defaultStyle.circle} ${style.avatar}`} />
      ) : ("")}
      <div className={defaultStyle.marginBottom}>
        <label htmlFor="avatar" className={`${defaultStyle.display} ${defaultStyle.label} ${defaultStyle.width} ${defaultStyle.center} ${isLoading ? defaultStyle.noPointer : defaultStyle.pointer}`}><i className={isLoading ? "fa-solid fa-spinner" : "fas fa-cloud-upload-alt"}></i> <strong>{isLoading ? "Loading..." : "Avatar *"}</strong></label>
        <input type="file" id="avatar" accept="image/*" className={defaultStyle.none} onChange={editAvatar} disabled={isLoading} />
      </div>
    </>
  );
};

export default Avatar;
