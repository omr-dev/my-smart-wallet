import { useAuth0 } from "@auth0/auth0-react";
import { FaSpinner } from "react-icons/fa";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { add, selectExpenses } from "../store/features/expenses/expensesSlice";
import { ExpensesList } from "../components/ExpensesList";

export const PageExpenses = () => {
  const expensesInState = useSelector(selectExpenses);
  const countOfExpenses = Object.keys(expensesInState).length;
  console.log(countOfExpenses);
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading } = useAuth0();
  if (!isLoading) {
    if (!isAuthenticated) {
      return <Navigate to="/home" replace />;
    } else {
      return (
        <div className="pageExpenses subPage">
          <h2>This is expenses page.</h2>
          <button
            onClick={() => dispatch(add({ title: "fuel", amount: 20, day: 1 }))}
          >
            Add Expense
          </button>
          {countOfExpenses > 0 && <ExpensesList />}
        </div>
      );
    }
  } else {
    return (
      <div>
        <FaSpinner className="spinner" />
      </div>
    );
  }
};
