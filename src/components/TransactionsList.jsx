//TODO: use shallowEqual for performance reasons
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {deleteTransaction} from '../features/transactions/transactionsSlice'


export const TransactionsList = () => {
  const transactionsInState = useSelector((state) => state.transactions);

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
          {transactionsInState.map((transaction) => {
            const title = transaction.title;
            const day = transaction.day;
            const amount = transaction.amount;
            const type = transaction.type;
            const id = transaction.id;

            return (
              <tr key={id}>
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
                      //TODO: create editable form
                      dispatch({
                        type: "edition/selectToEdit",
                        payload: transaction,
                      });
                      navigate("/transactionForm");
                    }}
                  >
                    EDIT
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Are you sure you want to delete ${title} ?`))
                        dispatch(deleteTransaction(id))
                        
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
