import React, { useState } from 'react';
import classes from './Verifaction.module.css';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Verifaction = () => {
  const token=useSelector((state)=>state.auth.idToken)
  console.log("VER",token)
  //  const authCtx=useContext(AuthContext)
    const history=useNavigate();
  const [inputEmail, setInputEmail] = useState('');
  const [isLoggedIn ,setIsLoggedIn]=useState(false)

   const modeHandler=()=>{
    setIsLoggedIn((prestate)=>!prestate)
   }
  const submitHandler = async(event) => {
    event.preventDefault();
    console.log(inputEmail);

    try {
        const response=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBC-k92hZtHMzRiGvhb1ReIWizoFNa0Q7w',{
            method:'POST',
            body:JSON.stringify({
                requestType:"VERIFY_EMAIL",
                idToken:token,
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        const data=await response.json();
        if(data.email===inputEmail)
        {
          history("/wel")
            
        }
        
    } catch (error) {
      console.error("email is invalid",error.message)   
    }
  };

  return (
    <div className={classes.main}>
      <button onClick={modeHandler} className={classes.btn}>Verify Email Id</button>
    { isLoggedIn && <div className={classes.form}>
        <form onSubmit={submitHandler}>
          <label htmlFor='email'>Enter Email:</label>
          <input
            type='email'
            placeholder='email'
            id='email'
            onChange={(e) => setInputEmail(e.target.value)}
            value={inputEmail}
          />

          <button type='submit' className={classes.bu}>
            Verify
          </button>
        </form>
      </div>}
    </div>
  );
};

export default Verifaction;
