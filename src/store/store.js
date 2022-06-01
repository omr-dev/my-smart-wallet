import {configureStore} from '@reduxjs/toolkit'
import expensesReducer from './features/expenses/expensesSlice'
export default configureStore({
    reducer:{
        expenses:expensesReducer
    }
})