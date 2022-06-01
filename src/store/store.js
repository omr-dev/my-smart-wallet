import {configureStore} from '@reduxjs/toolkit'
import expensesReducer from './features/expenses/expensesSlice'
import expenseToEditReducer from './features/expenses/expenseToEditSlice'
export default configureStore({
    reducer:{
        expenses:expensesReducer,
        expenseToEdit:expenseToEditReducer
    }
})