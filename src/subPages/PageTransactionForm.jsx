import { useState } from "react";
import {
  addTransaction,
  editTransaction,
} from "../store/features/transactions/transactionsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  getTransactions,
  getMarkedTransactionToEdit,
  markTransactionToEdit,
} from "../store/features/transactions/transactionsSlice";

export const PageTransactionForm = () => {
  let isEditForm = false;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const transactionsInState = useSelector(getTransactions);
  const transactionToEdit = useSelector(getMarkedTransactionToEdit);
  let titleToEdit, dayToEdit, amountToEdit, typeToEdit;
  if (transactionToEdit !== null) {
    isEditForm = true;
    titleToEdit = transactionsInState[transactionToEdit].title;
    dayToEdit = transactionsInState[transactionToEdit].day;
    amountToEdit = transactionsInState[transactionToEdit].amount;
    typeToEdit = transactionsInState[transactionToEdit].type;
  }
  const [day, setDay] = useState(dayToEdit ? dayToEdit : "");
  const [title, setTitle] = useState(titleToEdit ? titleToEdit : "");
  const [amount, setAmount] = useState(amountToEdit ? amountToEdit : "");
  const [type, setType] = useState(typeToEdit ? typeToEdit : "expense");

  return (
    <div className="page-transaction-form">
      <h2>{isEditForm ? "Edit" : "Add"} Transaction</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (isEditForm) {
            dispatch(
              editTransaction({
                targetId: transactionToEdit,
                newValue: {
                  title: title,
                  amount: amount,
                  day: day,
                },
              })
            );
            dispatch(markTransactionToEdit(null));
          } else {
            dispatch(
              addTransaction({
                type: type,
                title: title,
                amount: amount,
                day: day,
              })
            );
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
                if (isEditForm) {
                  dispatch(markTransactionToEdit(null));
                }
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
