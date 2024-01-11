import React,{useState} from "react";
const AuthContext=React.createContext({
    token:'',
    isLoggedIn:false,
    login:(token)=>{},
    logout:()=>{}
})

export const AuthContextProvider=(props)=>{
    const intialState=localStorage.getItem("token")
    const intialEmail=localStorage.getItem("email")
  const [token,setToken]=useState(intialState)
  const [email,setEmail]=useState(intialEmail)
   const userLoggedIn=!!token

   const loginHandler=(token,email)=>{
     setToken(token)
     setEmail(email)
     console.log("token",token,email)
     localStorage.setItem("token" ,token)
     localStorage.setItem("email",email)
   }
   const logoutHandler=()=>{
  setToken(null)
  setEmail(null)
  localStorage.removeItem("token")
  localStorage.removeItem("email")
   }
   const contextValue={
    token:token,
    email:email,
    isLoggedIn:userLoggedIn,
    login:loginHandler,
    logout:logoutHandler
   }

  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}

export default AuthContext