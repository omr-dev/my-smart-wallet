import { createSlice } from "@reduxjs/toolkit";
export const transactionsSlice = createSlice({
  name: "transactions",
  initialState: {
    value: { nextIndex: 1, markedTransactionToEdit: null, data: {} },
  },
  reducers: {
    addTransaction: (state, action) => {
      const newTransaction = action.payload;
      state.value.data[state.value.nextIndex] = newTransaction;
      state.value.nextIndex += 1;
    },
    editTransaction: (state, action) => {
      const targetTransaction = action.payload.targetId;
      state.value.data[targetTransaction] = action.payload.newValue;
    },
    markTransactionToEdit: (state, action) => {
      const markedTransactionID = action.payload;
      state.value.markedTransactionToEdit = markedTransactionID;
    },
    deleteTransaction: (state, action) => {
      const markedTransactionIDToDelete = action.payload;
      delete state.value.data[markedTransactionIDToDelete];
    },
  },
});
export const {
  addTransaction,
  editTransaction,
  deleteTransaction,
  markTransactionToEdit,
} = transactionsSlice.actions;
export const getTransactions = (state) => {
  return state.transactions.value.data;
};
export const getMarkedTransactionToEdit = (state) => {
  return state.transactions.value.markedTransactionToEdit;
};
export default transactionsSlice.reducer;
