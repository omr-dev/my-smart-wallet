import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export const PageTransactionForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const recordToEditInState = useSelector((state) => state.transactionToEdit);
  const isEditForm = recordToEditInState.hasRecordToEdit;
  console.log("isEditForm", isEditForm);

  const [day, setDay] = useState(isEditForm ? recordToEditInState.day : "");
  const [title, setTitle] = useState(
    isEditForm ? recordToEditInState.title : ""
  );
  const [amount, setAmount] = useState(
    isEditForm ? recordToEditInState.amount : ""
  );
  const [type, setType] = useState(
    isEditForm ? recordToEditInState.type : "expense"
  );

  return (
    <div className="page-transaction-form">
      <h2>{isEditForm ? "Edit" : "Add"} Transaction</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (isEditForm) {
            dispatch({
              type: "transactions/transactionEdited",
              payload: {
                type: type,
                title: title,
                amount: amount,
                day: day,
                id: recordToEditInState.id,
              },
            });
            dispatch({ type: "edition/unselect" });
          } else {
            dispatch({
              type: "transactions/transactionAdded",
              payload: { type: type, title: title, amount: amount, day: day },
            });
          }

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
                if (isEditForm) dispatch({ type: "edition/unselect" });
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
