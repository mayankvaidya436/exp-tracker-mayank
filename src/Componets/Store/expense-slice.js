import { createSlice } from "@reduxjs/toolkit";

const initialExpensesState = {
    expenses: [],
    editOB: "",
    reRender:false,
  };

const expenseSlice=createSlice({
    name:"expenses",
    initialState:initialExpensesState,
    reducers:{
        addExpense(state, action) {
            const newExpense = action.payload;
            const isItemPresent = state.expenses.some(expense => expense.id === newExpense.id);
            if (!isItemPresent) {
              state.expenses.push(newExpense);
            } else {
              console.log('Expense already present:', newExpense);
            }
          },
          removeExpense(state, action) {
            const expenseIdToRemove = action.payload;
            state.expenses = state.expenses.filter(expense => expense.id !== expenseIdToRemove);
          },
          editExpenses(state, action) {
            state.editOB = { ...action.payload };
          },
          clearExpenses(state, action) {
            state.expenses = action.payload;
          },
          setReRender(state, action) {
            state.reRender = action.payload.reRender;
          },
        

    }
})
export const expenseActions=expenseSlice.actions
export default expenseSlice