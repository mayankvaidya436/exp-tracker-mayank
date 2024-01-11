import Signup from './Componets/Authincation/Signup';
import React,{useEffect} from 'react';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Header from './Componets/Pages/Header';
import classes from './new.module.css'
import Root from './Componets/Pages/Root';
import Verifaction from './Componets/Pages/Verifaction';
import Welcome from './Componets/Pages/Welcome';
import ForgetPassword from './Componets/Pages/ForgetPassword';

import { useSelector } from 'react-redux';
function App() {
  //const authCtx=useContext(AuthContext)
  const isLoggedIn =  useSelector((state)=>state.auth.isLoggedIn)
console.log("APPP",isLoggedIn)

const isTheme = useSelector((state)=>state.theme.isDarkTheme)
useEffect(() => {
  document.body.classList.toggle(classes.dark, isTheme);
  return () => {
    document.body.classList.remove(classes.dark);
  };
}, [isTheme]);
  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path="/" element={ <Signup/>}></Route>
      <Route path='/ver' element={<Verifaction/>}></Route>
      <Route path='/wel' element={<Welcome/>}></Route>
      <Route path='/for' element={<ForgetPassword/>}></Route>
      <Route path='/ro' element={<Root/>}></Route>
      
      <Route path='/hed' element={<Header/>}></Route>
     </Routes>
     </BrowserRouter>

   
    </>
  );
}

export default App;
