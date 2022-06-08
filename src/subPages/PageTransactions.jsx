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

  //TODO:add in redux
  // useEffect(() => {
  //   const dbUrl = "http://127.0.0.1:3001/data";
  //   (async () => {
  //     const transactionsInDb = (await axios.get(dbUrl)).data;
  //     console.log("transactionsInDb", transactionsInDb);
  //   })();
  //   (async () => {
  //     await axios.post(dbUrl,{type: 'income', title: 'maas', amount: 5000, day: 12})
  //     .then((response)=>{console.log('27-responseJSON-SERVER',response);})
  //     .catch((error)=>{console.error(error);})
  //   })();
  //   (async () => {
  //     await axios.put((dbUrl+'/7'),{type: 'income', title: 'maas', amount: 105000, day: 18})
  //     .then((response)=>{console.log('32-responseJSON-SERVER',response);})
  //     .catch((error)=>{console.error(error);})
  //   })();
  //   (async()=>{
  //     await axios.delete((dbUrl+'/6'))
  //     .then((response)=>{console.log('37-responseJSON-SERVER',response);})
  //     .catch((error)=>{console.error(error);})
  //   })()
  // }, []);

  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth0();
  if (!isLoading) {
    if (!isAuthenticated) {
      return <Navigate to="/home" replace />;
    } else {
      return (
        <div className="pageTransactions subPage">
          <h2>This is transactions page.</h2>

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
