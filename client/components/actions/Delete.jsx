import useHttp from "../../hooks/use-http";
import NotificationLayout from "../layouts/NotificationLayout";
import style from "../../App.module.css";
import { Delete as DeleteIcon, Loop } from "@mui/icons-material";

const Delete = (props) => {
  const { route, message, onCompleteDeletion } = props;

  const { isLoading, error, sendRequest } = useHttp();

  const deleteValue = async () => {
    const isConfirmed = window.confirm(message);
    if (isConfirmed) {
      sendRequest(
        {
          url: `${window.location.origin}${route}`,
          method: "DELETE",
          authentication: true
        },
        onCompleteDeletion
      );
    }
  };

  return (
    <>
      {!isLoading ? (
        <DeleteIcon className={`${style.pointer} ${style.iconMargin}`} onClick={deleteValue} />
      ) : (
        <Loop className={style.iconMargin} />
      )}
      {error && (
        <NotificationLayout isError>{error}</NotificationLayout>
      )}
    </>
  );
};

export default Delete;
