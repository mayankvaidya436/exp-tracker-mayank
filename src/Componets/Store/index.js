import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import expenseSlice from "./expense-slice";
import themeSlice from "./themeSlice";
const store=configureStore({
    reducer:{
     auth:authSlice.reducer,
     expense:expenseSlice.reducer,
     theme:themeSlice.reducer
    }
})
export default store