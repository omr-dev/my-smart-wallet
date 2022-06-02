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
  let titleToEdit, dayToEdit, amountToEdit;
  if (transactionToEdit !== null) {
    isEditForm = true;
    titleToEdit = transactionsInState[transactionToEdit].title;
    dayToEdit = transactionsInState[transactionToEdit].day;
    amountToEdit = transactionsInState[transactionToEdit].amount;
  }
  const [day, setDay] = useState(dayToEdit ? dayToEdit : 1);
  const [title, setTitle] = useState(titleToEdit ? titleToEdit : "");
  const [amount, setAmount] = useState(amountToEdit ? amountToEdit : 1);

  return (
    <div className="page-transaction-form">
      <h2>{isEditForm ? "Edit" : "Add"} Transaction</h2>

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
                  dispatch(addTransaction({ title: title, amount: amount, day: day }));
                }
                navigate("/transactions");
              }}
            >
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
