import { convertString } from "../../utilities/scripts";
import { validArray } from "../../../utilities/validations";
import constants from "../../../utilities/constants";
import Reference from "./Reference";
import TableLayout from "../layouts/TableLayout";
import NoValuesLayout from "../layouts/NoValuesLayout";
import style from "../../App.module.css";

const ReferencesTable = (props) => {
  const { references, type, onCompleteEdit, onCompleteDeletion } = props;

  return (
    <>
      <h2 className={style.center}>{`${convertString(type, true)}s`}</h2>
      {validArray(references) ? (
        <TableLayout labels={constants.REFERENCES_LABELS} customization={`${style.auto} ${style.bigContent}`}>
          {references.map((reference, index) => (
            <Reference key={`${reference._id}_${new Date().getTime()}`} reference={reference} index={++index} onCompleteEdit={onCompleteEdit} onCompleteDeletion={onCompleteDeletion} />
          ))}
        </TableLayout>
      ) : (
        <NoValuesLayout message={`No ${type}s found!`} />
      )}
    </>
  );
};

export default ReferencesTable;
