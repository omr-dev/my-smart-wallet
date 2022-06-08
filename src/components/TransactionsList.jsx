//TODO: use shallowEqual for performance reasons
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const TransactionsList = () => {
  const transactionsInState = useSelector((state) => state.transactions);

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
                        dispatch({
                          type: "transactions/transactionDeleted",
                          payload: id,
                        });
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
