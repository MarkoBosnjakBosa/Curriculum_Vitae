import { convertString } from "../../utilities/scripts";
import { validArray } from "../../../utilities/validations";
import constants from "../../../utilities/constants";
import defaultStyle from "../../App.module.css";
import ResumeItem from "./ResumeItem";
import TableLayout from "../layouts/TableLayout";
import NoValuesLayout from "../layouts/NoValuesLayout";

const ResumeTable = (props) => {
  const { resume, type, onCompleteEdit, onCompleteDeletion } = props;

  return (
    <>
      <h2 className={defaultStyle.center}>{`${convertString(type, true)} resume`}</h2>
      {validArray(resume) ? (
        <TableLayout labels={constants.RESUME_LABELS} customization={`${defaultStyle.auto} ${defaultStyle.bigContent}`}>
          {resume.map((resumeItem, index) => (
            <ResumeItem key={`${resumeItem._id}_${new Date().getTime()}`} resumeItem={resumeItem} index={++index} onCompleteEdit={onCompleteEdit} onCompleteDeletion={onCompleteDeletion} />
          ))}
        </TableLayout>
      ) : (
        <NoValuesLayout message={`No ${type} resume items found!`} />
      )}
    </>
  );
};

export default ResumeTable;
