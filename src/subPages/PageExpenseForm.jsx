import { useState } from "react";
import { add } from "../store/features/expenses/expensesSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const PageExpenseForm = () => {
  const [day, setDay] = useState(1);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="page-expense-form">
      <h2>Add Expense</h2>

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
                dispatch(add({ title: title, amount: amount, day: day }));
                navigate("/expenses");
              }}
            >
              Submit
            </button>
            <button
              className="btn-cancel"
              onClick={() => {
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
