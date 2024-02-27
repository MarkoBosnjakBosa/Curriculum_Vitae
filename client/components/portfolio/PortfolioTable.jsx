import { convertString } from "../../utilities/scripts";
import { validArray } from "../../../utilities/validations";
import constants from "../../../utilities/constants";
import PortfolioItem from "./PortfolioItem";
import TableLayout from "../layouts/TableLayout";
import NoValuesLayout from "../layouts/NoValuesLayout";
import style from "../../App.module.css";

const PortfolioTable = (props) => {
  const { portfolio, type, onCompleteEdit, onCompleteDeletion } = props;

  return (
    <>
      <h2 className={style.center}>{`${convertString(type, true)} portfolio`}</h2>
      {validArray(portfolio) ? (
        <TableLayout labels={constants.PORTFOLIO_LABELS} customization={`${style.auto} ${style.bigContent}`}>
          {portfolio.map((portfolioItem, index) => (
            <PortfolioItem key={`${portfolioItem._id}_${new Date().getTime()}`} portfolioItem={portfolioItem} index={++index} onCompleteEdit={onCompleteEdit} onCompleteDeletion={onCompleteDeletion} />
          ))}
        </TableLayout>
      ) : (
        <NoValuesLayout message={`No ${type} portfolio items found!`} />
      )}
    </>
  );
};

export default PortfolioTable;
