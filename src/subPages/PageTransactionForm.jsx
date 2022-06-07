import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export const PageTransactionForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [day, setDay] = useState();
  const [title, setTitle] = useState();
  const [amount, setAmount] = useState();
  const [type, setType] = useState("expense");

  return (
    <div className="page-transaction-form">
      <h2>Add Transaction</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();

          dispatch({
            type: "transactions/transactionAdded",
            payload: { type: type, title: title, amount: amount, day: day },
          });
          navigate("/transactions");
        }}
      >
        <div
          className="form-container"
          style={{
            borderColor: type === "expense" ? "red" : "green",
          }}
        >
          <div className="form-row ">
            <label htmlFor="type">Type:</label>
            <select
              value={type}
              onChange={(e) => {
                setType(e.target.value);
              }}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
          <div className="form-row">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              required
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
              required
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
              required
            />
          </div>
          <div className="form-row">
            <button type="submit" className="btn-submit">
              Submit
            </button>
            <button
              className="btn-cancel"
              onClick={() => {
                navigate("/transactions");
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
