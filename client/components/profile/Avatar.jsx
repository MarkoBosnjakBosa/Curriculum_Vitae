import useHttp from "../../hooks/use-http";
import { validMimeType } from "../../../utilities/validations";
import NotificationLayout from "../layouts/NotificationLayout";
import defaultStyle from "../../App.module.css";
import style from "./Profile.module.css";

const Avatar = (props) => {
  const { userId, avatar, onUpload } = props;

  const { isLoading, error, sendRequest } = useHttp();

  const completeEdit = (newAvatar) => onUpload(newAvatar);

  const editAvatar = (event) => {
    const files = event.target.files;
    if (files && files.length) {
      const file = files[0];
      const mimeType = file.type;
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
            completeEdit
          );
        }
        fileReader.readAsDataURL(file);
      }
    }
  };

  return (
    <>
      {error && (
        <NotificationLayout isError>{error}</NotificationLayout>
      )}
      <img src={avatar.data} alt={avatar.name} className={`${defaultStyle.marginBottom} ${defaultStyle.width} ${defaultStyle.circle} ${style.avatar}`} />
      <div className={defaultStyle.marginBottom}>
        <label htmlFor="avatar" className={`${defaultStyle.display} ${defaultStyle.label} ${defaultStyle.width} ${defaultStyle.center} ${isLoading ? defaultStyle.noPointer : defaultStyle.pointer}`}><i className={isLoading ? "fa-solid fa-spinner" : "fas fa-cloud-upload-alt"}></i> <strong>{isLoading ? "Loading..." : "Upload"}</strong></label>
        <input type="file" accept="image/*" id="avatar" className={defaultStyle.none} onChange={editAvatar} disabled={isLoading} />
      </div>
    </>
  );
};

export default Avatar;
