import useHttp from "../../hooks/use-http";
import NotificationLayout from "../layouts/NotificationLayout";
import { Button } from "@mui/material";
import { Done, Close } from "@mui/icons-material";

const Answer = (props) => {
  const { contactId, isAnswered, onCompleteEdit } = props;

  const { isLoading, error, sendRequest } = useHttp();

  const answerContact = async () => {
    const isConfirmed = window.confirm("Edit answer?");
    if (isConfirmed) {
      sendRequest(
        {
          url: `${window.location.origin}/answerContact/${contactId}`,
          method: "PUT",
          body: JSON.stringify({ isAnswered: !isAnswered }),
          authentication: true
        },
        onCompleteEdit
      );
    }
  };

  return (
    <>
      <Button type="button" color={isAnswered ? "success" : "error"} variant="contained" endIcon={isAnswered ? <Done /> : <Close />} onClick={answerContact} disabled={isLoading}>{!isLoading ? (isAnswered ? "Answered" : "Not answered") : "Loading..."}</Button>
      {error && (
        <NotificationLayout isError>{error}</NotificationLayout>
      )}
    </>
  );
};

export default Answer;
