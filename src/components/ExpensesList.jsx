import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectExpenses,
  setTargetExpenseToEdit,
  deleteExpense,
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
            const title = expensesInState[expenseKey].title;
            const day = expensesInState[expenseKey].day;
            const amount = expensesInState[expenseKey].amount;
            return (
              <tr key={expenseKey}>
                <td>{day}</td>
                <td>{title}</td>
                <td>{amount}</td>
                <td>
                  <button
                    onClick={() => {
                      dispatch(setTargetExpenseToEdit(expenseKey));
                      navigate("/expenseForm");
                    }}
                  >
                    EDIT
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Are you sure you want to delete ${title} ?`))
                        dispatch(deleteExpense(expenseKey));
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
