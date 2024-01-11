import { createSlice } from "@reduxjs/toolkit";

const idToken=localStorage.getItem("token")
const userId=localStorage.getItem("email")

const isLoggedIn = !!idToken;
console.log("auth-s",isLoggedIn)
const initialAuthState = {
    isLoggedIn: isLoggedIn,
    idToken: idToken,
    userId: userId,
  };

const authSlice=createSlice({
    name:"authincation" ,
    initialState: initialAuthState,
    reducers:{
      login(state,action){
        state.isLoggedIn=true;
        state.idToken=action.payload.idToken;
        state.userId=action.payload.userId;
        localStorage.setItem("email", action.payload.userId)
        localStorage.setItem("token" ,action.payload.idToken)

      },
      logout(state,action){
        state.isLoggedIn=false;
        state.idToken=null;
        state.userId="";
        localStorage.removeItem("email")
        localStorage.removeItem("token")
      }
    }
})
export const authActions=authSlice.actions;
export default authSlice;