import { convertString } from "../../utilities/scripts";
import constants from "../../../utilities/constants";
import PortfolioItem from "./PortfolioItem";
import TableLayout from "../layouts/TableLayout";
import NoValuesLayout from "../layouts/NoValuesLayout";
import defaultStyle from "../../App.module.css";

const PortfolioTable = (props) => {
  const { portfolio, type, onCompleteEdit, onCompleteDeletion } = props;

  return (
    <>
      <h2 className={defaultStyle.center}>{`${convertString(type, true)} portfolio`}</h2>
      {portfolio.length ? (
        <TableLayout labels={constants.PORTFOLIO_LABELS} customization={`${defaultStyle.auto} ${defaultStyle.bigContent}`}>
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
