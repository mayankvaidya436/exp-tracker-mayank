import { createSlice } from "@reduxjs/toolkit";
const themeSlice=createSlice({
    name:"theme",
    initialState:{
        isDarkThemeEnable: false,
    isDarkTheme: false,
    },
    reducers:{
        enableDarkTheme: (state,action) => {
            state.isDarkThemeEnable = !state.isDarkThemeEnable ;
          },
          toggleTheme: (state) => {
            state.isDarkTheme = !state.isDarkTheme;
          },

    }
}) 
export const {enableDarkTheme,toggleTheme}=themeSlice.actions
export default themeSlice