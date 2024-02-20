import { convertString } from "../../utilities/scripts";
import constants from "../../../utilities/constants";
import Reference from "./Reference";
import TableLayout from "../layouts/TableLayout";
import NoValuesLayout from "../layouts/NoValuesLayout";
import defaultStyle from "../../App.module.css";

const ReferencesTable = (props) => {
  const { references, type, onCompleteEdit, onCompleteDeletion } = props;

  return (
    <>
      <h2 className={defaultStyle.center}>{`${convertString(type, true)}s`}</h2>
      {references.length ? (
        <TableLayout labels={constants.REFERENCES_LABELS} customization={`${defaultStyle.auto} ${defaultStyle.bigContent}`}>
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
