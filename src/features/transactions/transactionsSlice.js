//TODO: add spinner during server process
import axios from "axios";

const dbUrl = "http://127.0.0.1:3001/data";
const INITIAL_STATE = [];
function nextTransactionId(transactions) {
  const maxId = transactions.reduce((maxId, transaction) => {
    return Math.max(transaction.id, maxId);
  }, -1);

  return maxId + 1;
}
export default function transactionsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "transactions/transactionAdded": {
      return [
        ...state,

        {
          id: action.payload.id,
          type: action.payload.type,
          title: action.payload.title,
          amount: action.payload.amount,
          day: action.payload.day,
        },
      ];
    }

    case "transactions/transactionEdited": {
      return [
        ...state.map((transaction) => {
          if (transaction.id !== action.payload.id) {
            return transaction;
          } else {
            return {
              ...transaction,
              type: action.payload.type,
              title: action.payload.title,
              amount: action.payload.amount,
              day: action.payload.day,
            };
          }
        }),
      ];
    }
    case "transactions/transactionDeleted": {
      return [
        ...state.filter((transaction) => transaction.id !== action.payload),
      ];
    }
    case "transactions/transactionsLoaded": {
      return action.payload;
    }
    default:
      return state;
  }
}
export async function fetchTransactions(dispatch, getState) {
  const response = (await axios.get(dbUrl)).data;
  dispatch({ type: "transactions/transactionsLoaded", payload: response });
}
export function deleteTransaction(transactionId) {
  return async function deleteTransactionThunk(dispatch, getstate) {
    await axios.delete(`${dbUrl}/${transactionId}`).then((response) => {
      //TODO:add error message
      console.log(65, "then calisti");
      dispatch({
        type: "transactions/transactionDeleted",
        payload: transactionId,
      });
    });
  };
}
export function saveTransaction(transaction) {
  return async function saveNewTransactionThunk(dispatch, getState) {
    const initialTransaction = { ...transaction };
    const response = (await axios.post(dbUrl, initialTransaction)).data;
    dispatch({ type: "transactions/transactionAdded", payload: response });
  };
}

export function editTransaction(transaction) {
  return async function editTransactionThunk(dispatch, getstate) {
    const initialTransaction = { ...transaction };
    const response = (
      await axios.put(`${dbUrl}/${transaction.id}`, initialTransaction)
    ).data;
    dispatch({ type: "transactions/transactionEdited", payload: response });
  };
}
