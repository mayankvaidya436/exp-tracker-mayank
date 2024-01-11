import React from 'react'
import classes from './Root.module.css'
import InputExpense from '../InputExpense/InputExpense'
import OutputExpense from '../OutputExpnese/OutputExpense'
import { useSelector } from 'react-redux'
const Root = () => {
  const isTheme = useSelector((state)=>state.theme.isDarkTheme)
  return (
    <>
    {isTheme && classes.dark}
     <div >
    <InputExpense/>
    <OutputExpense/>
    </div>
    </>
  )
}

export default Root