import { useState } from "react";
import { add, edit } from "../store/features/expenses/expensesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { selectExpenses,selectSelectedExpenseToEdit,setTargetExpenseToEdit } from "../store/features/expenses/expensesSlice";

export const PageExpenseForm = () => {
  let isEditForm = false;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const expensesInState = useSelector(selectExpenses);
  const expenseToEdit = useSelector(selectSelectedExpenseToEdit);
  let titleToEdit, dayToEdit, amountToEdit;
  if (expenseToEdit !== null) {
    isEditForm = true;
    titleToEdit = expensesInState[expenseToEdit].title;
    dayToEdit = expensesInState[expenseToEdit].day;
    amountToEdit = expensesInState[expenseToEdit].amount;
  }
  const [day, setDay] = useState(dayToEdit ? dayToEdit : 1);
  const [title, setTitle] = useState(titleToEdit ? titleToEdit : "");
  const [amount, setAmount] = useState(amountToEdit ? amountToEdit : 1);

  return (
    <div className="page-expense-form">
      <h2>{isEditForm ? "Edit" : "Add"} Expense</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="form-container">
          <div className="form-row">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="form-row">
            <label htmlFor="day">Day:</label>
            <input
              type="number"
              name="day"
              min="1"
              max="31"
              value={day}
              onChange={(e) => {
                setDay(e.target.value);
              }}
            />
          </div>

          <div className="form-row">
            <label htmlFor="amount">Amount:</label>
            <input
              type="number"
              min="1"
              step="any"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
          </div>
          <div className="form-row">
            <button
              type="submit"
              className="btn-submit"
              onClick={() => {
                if (isEditForm) {
                  dispatch(
                    edit({
                      targetId: expenseToEdit,
                      newValue: {
                        title: title,
                        amount: amount,
                        day: day,
                      },
                    })
                  );
                  dispatch(setTargetExpenseToEdit(null));
                } else {
                  dispatch(add({ title: title, amount: amount, day: day }));
                }
                navigate("/expenses");
              }}
            >
              Submit
            </button>
            <button
              className="btn-cancel"
              onClick={() => {
                if (isEditForm) {
                  dispatch((setTargetExpenseToEdit(null)));
                }
                navigate("/expenses");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
