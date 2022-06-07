import { combineReducers } from "redux";
import transactionsReducer from "./features/transactions/transactionsSlice";

const rootReducer = combineReducers({transactions:transactionsReducer});
export default rootReducer;

