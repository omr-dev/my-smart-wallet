import { useSelector } from "react-redux";
import { selectExpenses } from "../store/features/expenses/expensesSlice";

export const ExpensesList = () => {
  const expensesInState = useSelector(selectExpenses);

  return (
    <div className="expensesList">
      <table className="expensesTable">
        <thead>
          <th>DAY</th>
          <th>TITLE</th>
          <th>AMOUNT</th>
          <th>ACTIONS</th>
        </thead>
        <tbody>
          {Object.keys(expensesInState).map((expenseKey) => {
            return (
              <tr>
                <td>{expensesInState[expenseKey].day}</td>
                <td>{expensesInState[expenseKey].title}</td>
                <td>{expensesInState[expenseKey].amount}</td>
                <td>
                  <button>EDIT</button> <button>DELETE</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
