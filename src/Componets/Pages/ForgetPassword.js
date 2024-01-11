import React, { useState } from 'react';
import classes from './ForgetPassword.module.css';
import { useNavigate } from 'react-router-dom';
const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isloading,setIsloading]=useState(false)
  const history=useNavigate();

  const submitHandler =async (event) => {
    event.preventDefault();
    setIsloading(true)


  try {
    const response=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBC-k92hZtHMzRiGvhb1ReIWizoFNa0Q7w',{
        method:'POST',
        body:JSON.stringify({
            email:email,
            requestType:"PASSWORD_RESET" 
        }),
        headers:{
            'Content-Type': 'application/json'
        }
    
    })
    const data=await response.json();
    if(response.ok)
    {    setIsloading(false)
        console.log(data)
        history('/')
    }else{
        throw new Error("invalid password")
    }
    
  } catch (error) {
    console.error(error.message)
  }
  };

  return (
    <div className={classes.main}>
      <div className={classes.form}>
        <form onSubmit={submitHandler} className={classes.int}>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            placeholder='email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            placeholder='password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button type='submit' className={classes.btn}>
            {isloading?"sending...":"send link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
