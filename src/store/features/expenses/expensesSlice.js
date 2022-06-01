import { createSlice } from "@reduxjs/toolkit";
export const expensesSlice = createSlice({
  name: "expenses",
  initialState: { value: { nextIndex: 1, data: {} } },
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
  },
});
export const { add, edit } = expensesSlice.actions;
export const selectExpenses = (state) => {
  return state.expenses.value.data;
};
export default expensesSlice.reducer;
