import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getTransactions,
  markTransactionToEdit,
  deleteTransaction,
} from "../store/features/transactions/transactionsSlice";

export const TransactionsList = () => {
  const transactionsInState = useSelector(getTransactions);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="transactionsList">
      <table className="transactionsTable">
        <thead>
          <tr>
            <th>DAY</th>
            <th>TITLE</th>
            <th>AMOUNT</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(transactionsInState).map((transactionKey) => {
            const title = transactionsInState[transactionKey].title;
            const day = transactionsInState[transactionKey].day;
            const amount = transactionsInState[transactionKey].amount;
            const type = transactionsInState[transactionKey].type;

            return (
              <tr key={transactionKey}>
                <td>{day}</td>
                <td>{title}</td>
                <td className={`amountCell ${type === "expense" ? "redText " : "greenText "}`}>
                  {type === "expense" ? "- " : "+ "}
                  {amount} €
                </td>
                <td>
                  <button
                    onClick={() => {
                      dispatch(markTransactionToEdit(transactionKey));
                      navigate("/transactionForm");
                    }}
                  >
                    EDIT
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Are you sure you want to delete ${title} ?`))
                        dispatch(deleteTransaction(transactionKey));
                    }}
                  >
                    DELETE
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
