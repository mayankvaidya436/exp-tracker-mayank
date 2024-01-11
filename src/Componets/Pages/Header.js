import React, { useState,useEffect } from 'react';
import classes from './Header.module.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Header = () => {
  const token = useSelector((state)=>state.idToken)
    
  const [name, setName] = useState('');
  const [profile, setProfile] = useState('');
  const [isComplete, setIsComplete] = useState(false);
 // const authCtx=useContext(AuthContext)
  const history=useNavigate();
  const modeHandler = () => {
    setIsComplete((prevState) => !prevState);
  };
  const fetchdata=async()=>{
    try {
        const response=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBC-k92hZtHMzRiGvhb1ReIWizoFNa0Q7w',{
            method:'POST',
            body:JSON.stringify({
                idToken:token
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        
            const data=await response.json();
            
            if (data.users && data.users.length > 0) {
                const user = data.users[0];
                setName(user.displayName || ''); 
                setProfile(user.photoUrl || '');
                
              }
        
        
    } catch (error) {
         console.error("not updated",error.message)
    }
  }

  const submitHandler = async(event) => {
    event.preventDefault();

   console.log(name,profile)

   try {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBC-k92hZtHMzRiGvhb1ReIWizoFNa0Q7w",
      {
        method: "POST",
        body: JSON.stringify({
            idToken:token,
          displayName:name,
          photoUrl:profile,
          returnSecureToken:true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
const data = await response.json()
    console.log(data);
    history('/ro');
  } catch (error) {
    console.error("Error submitting form:", error);
  }
  

    setName('');
    setProfile('');
  };
  useEffect(()=>{
    fetchdata()
  },[token])

  return (
    <div className={classes.main}>
      <header className={classes.head}>
        {isComplete ? (
          <h4>Winners never quit, Quitters never win</h4>
        ) : (
          <h4>Welcome to the expense tracker</h4>
        )}
        <div className={classes.box}>
          {isComplete ? (
            <p>Complete the Profile</p>
          ) : (
            <p>Your profile is incomplete.</p>
          )}
          <button className={classes.btn} onClick={modeHandler}>
            Complete now
          </button>
        </div>
      </header>
      {isComplete && (
        <div className={classes.detail}>
          <h4>Contact Details</h4>
          <form onSubmit={submitHandler} className={classes.form}>
            <div className={classes.int}>
              <label htmlFor='name'>Full Name</label>
              <input
                type='text'
                id='name'
                placeholder='Name'
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className={classes.int}>
              <label htmlFor='photo'>Profile photo</label>
              <input
                type='text'
                id='photo'
                placeholder='Photo'
                onChange={(e) => setProfile(e.target.value)}
                value={profile}
              />
            </div>
            <button type='submit'>Update</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Header;
