import { createSlice } from "@reduxjs/toolkit";
export const expenseToEditSlice = createSlice({
  name: "expenseToEdit",
  initialState: { value: 0 },
  reducers: {
    sendExpenseToEdit: (state, action) => {state.value = action.payload},
  },
});
export const { sendExpenseToEdit } = expenseToEditSlice.actions;
export const selectExpenseToEdit = (state) => state.expenseToEdit.value;
export default expenseToEditSlice.reducer;
