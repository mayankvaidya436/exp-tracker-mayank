import React from "react";
import classes from './Welcome.module.css'
import { Link } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { authActions } from "../Store/auth-slice";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  // const authCtx=useContext(AuthContext)
   const history=useNavigate()
   const logoutHandler=()=>{
    dispatch(authActions.logout())
  // authCtx.logout();
   history('/')
   }
   

  return (
    <div className={classes.main}><div className={classes.wel}>WELCOME</div>
    <h2>Welcome To Expense Tracker !!</h2>
    <div className={classes.Link}>
    { isLoggedIn &&  <>
        <p>  Your profile is incomplete</p>
        <Link to="/hed">Complete now</Link>
        </>}
    </div>
    <button onClick={logoutHandler}  className={classes.log}>logout</button>

   
    </div>
    
  )
}

export default Welcome