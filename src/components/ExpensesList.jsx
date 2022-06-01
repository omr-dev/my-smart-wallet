import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectExpenses } from "../store/features/expenses/expensesSlice";
import { sendExpenseToEdit } from "../store/features/expenses/expenseToEditSlice";

export const ExpensesList = () => {
  const expensesInState = useSelector(selectExpenses);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="expensesList">
      <table className="expensesTable">
        <thead>
          <td>DAY</td>
          <td>TITLE</td>
          <td>AMOUNT</td>
          <td>ACTIONS</td>
        </thead>
        <tbody>
          {Object.keys(expensesInState).map((expenseKey) => {
            return (
              <tr key={expenseKey}>
                <td>{expensesInState[expenseKey].day}</td>
                <td>{expensesInState[expenseKey].title}</td>
                <td>{expensesInState[expenseKey].amount}</td>
                <td>
                  <button
                    onClick={() => {
                      dispatch(sendExpenseToEdit(expenseKey));
                      navigate("/expenseForm");
                    }}
                  >
                    EDIT
                  </button>{" "}
                  <button>DELETE</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
