import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getTransactions,
  markTransactionToEdit,
  deleteTransaction,
} from "../store/features/transactions/transactionsSlice";

export const TransactionsList = () => {
  const transactionsInState = useSelector(getTransactions);
  const balance = getBalance(transactionsInState);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="transactionsList">
      <h3>
        Balance :{" "}
        <span className={balance > 0 ? "greenText" : "redText"}>
          {balance > 0 && "+"}
          {balance} €
        </span>
      </h3>
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
                <td
                  className={`amountCell ${
                    type === "expense" ? "redText " : "greenText "
                  }`}
                >
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
function getBalance(transactions) {
  let balance = 0;
  Object.keys(transactions).forEach((key) => {
    let amount = Number(transactions[key].amount);
    if (transactions[key].type === "expense") amount *= -1;
    balance += amount;
  });
  return balance;
}
