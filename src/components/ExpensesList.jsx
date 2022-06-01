import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectExpenses,
  setTargetExpenseToEdit,
} from "../store/features/expenses/expensesSlice";

export const ExpensesList = () => {
  const expensesInState = useSelector(selectExpenses);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="expensesList">
      <table className="expensesTable">
        <thead>
          <tr>
            <th>DAY</th>
            <th>TITLE</th>
            <th>AMOUNT</th>
            <th>ACTIONS</th>
          </tr>
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
                      dispatch(setTargetExpenseToEdit(expenseKey));
                      navigate("/expenseForm");
                    }}
                  >
                    EDIT
                  </button>
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
