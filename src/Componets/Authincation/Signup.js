import React,{useState,useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import classes from './Signup.module.css'

import { authActions } from '../Store/auth-slice'
import { useDispatch } from 'react-redux'
const Signup = () => {
    const dispatch = useDispatch();
   // const authCtx=useContext(AuthContext)
    const history=useNavigate();
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [confirm,setConfirm]=useState('')
    const [isLogin,setIslogin ]=useState(false)
     
     const modeHandler=()=>{
        setIslogin((prestate)=>!prestate)
     }
    const SubmitHandler=async(event)=>{
        event.preventDefault();

    console.log(email,password,confirm)
    let url;
    if (email.length>0 && password) {
        
        if (isLogin) {
             url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBC-k92hZtHMzRiGvhb1ReIWizoFNa0Q7w'
        } else {
            url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBC-k92hZtHMzRiGvhb1ReIWizoFNa0Q7w'
        }
    }


    try {
        const response=await fetch(url,{
            method:'POST',
            body:JSON.stringify({
                email:email,
                password:password,
                returnSecureToken:true
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        if(response.ok)
        {  
            const data=await response.json()

            console.log("succefull",data.idToken,data.email)
            const idToken=data.idToken
            const userId=data.email
            dispatch(authActions.login({idToken,userId}))
           // authCtx.login(data.idToken,data.email)
            history('/ver')
        }
        else{
            
            throw new Error("not done")
        }
        
    } catch (error) {
        console.log(error.message)
        alert("plzz enter vaild info")
    }
   

    setConfirm('')
    setEmail('')
    setPassword('')
    
    }
  return (
    <div className={classes.main} >
        <div className={classes.box}>
            <h3 className={classes.h}> {isLogin ?'login':'Signup'}</h3>
            <form  onSubmit={SubmitHandler}  className={classes.form}>
                <label htmlFor='email' >Email</label>
                <input type='email' placeholder='email'
                 className={classes.int} value={email}
                 onChange={(e)=>{setEmail(e.target.value)}}
                 ></input>

                <label htmlFor='password'>password</label>
                <input type='password' placeholder='password'
                 className={classes.int} value={password}
                 onChange={(e)=>{setPassword(e.target.value)}}
                 ></input>

               {!isLogin && <label htmlFor='confirm'>Confirm password</label>}
              {!isLogin &&  <input type='password' placeholder='confirm' 
                className={classes.int} value={confirm}
                onChange={(e)=>{setConfirm(e.target.value)}}
                ></input> }
                <button type='submit' className={classes.btn}>{ isLogin ? 'login':'Signup'}</button>
                {isLogin &&<Link to="/for" className={classes.for}>Forget Password</Link>}
            </form>
        </div>
        <button onClick={modeHandler} className={classes.acc}> {isLogin? 'dont have an account: signup':'Have an account? Login'}</button>
    </div>
  )
}

export default Signup