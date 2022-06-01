import { createSlice } from "@reduxjs/toolkit";
export const expensesSlice = createSlice({
  name: "expenses",
  initialState: {
    value: { nextIndex: 1, selectedExpenseToEdit: null, data: {} },
  },
  reducers: {
    add: (state, action) => {
      const newExpense = action.payload;
      state.value.data[state.value.nextIndex] = newExpense;
      state.value.nextIndex += 1;
    }, //TODO: add EDIT,REMOVE reducers
    edit: (state, action) => {
      const targetExpense = action.payload.targetId;
      state.value.data[targetExpense] = action.payload.newValue;
    },
    setTargetExpenseToEdit: (state, action) => {
      const selectedExpense = action.payload;
      state.value.selectedExpenseToEdit = selectedExpense;
    },
    deleteExpense: (state, action) => {
      const selectedExpenseToDelete = action.payload;
      delete state.value.data[selectedExpenseToDelete];
    },
  },
});
export const { add, edit, deleteExpense, setTargetExpenseToEdit } =
  expensesSlice.actions;
export const selectExpenses = (state) => {
  return state.expenses.value.data;
};
export const selectSelectedExpenseToEdit = (state) => {
  return state.expenses.value.selectedExpenseToEdit;
};
export default expensesSlice.reducer;
