import { combineReducers } from "redux";
import transactionsReducer from "./features/transactions/transactionsSlice";
import transactionToEditReducer from "./features/transactions/transactionToEditSlice";

const rootReducer = combineReducers({
  transactions: transactionsReducer,
  transactionToEdit: transactionToEditReducer,
});
export default rootReducer;
