import { useAuth0 } from "@auth0/auth0-react";
import { FaSpinner } from "react-icons/fa";
import { Navigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";

import { TransactionsList } from "../components/TransactionsList";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {fetchTransactions} from '../features/transactions/transactionsSlice'
import axios from "axios";

export const PageTransactions = () => {
  const dispatch = useDispatch();
  const transactionsInState = useSelector((state) => state.transactions);
  let countOfTransactions = transactionsInState.length;

  
  //DB
  useEffect(() => {
    dispatch(fetchTransactions);
  },[]);



  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth0();
  if (!isLoading) {
    if (!isAuthenticated) {
      return <Navigate to="/home" replace />;
    } else {
      return (
        <div className="pageTransactions subPage">
         
          <button
            className="btn-add-transaction"
            onClick={() => {
              navigate("/transactionForm");
            }}
          >
            Add Transaction
          </button>

          {countOfTransactions > 0 ? (
            <TransactionsList />
          ) : (
            <p>There are no transactions.</p>
          )}
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
