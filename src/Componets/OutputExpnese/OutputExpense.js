import React,{useEffect} from 'react'
import classes from './OutputExpense.module.css'
import { useDispatch,useSelector } from 'react-redux'
import { expenseActions } from '../Store/expense-slice'
import { enableDarkTheme } from '../Store/themeSlice'
const OutputExpense = (props) => {
    //const EditCtx = useContext(EditExpenseContext)
    const dispatch = useDispatch()
  const email = useSelector((state)=>state.auth.userId)
  const reRenderValue = useSelector(state => state.expense.reRender);
  console.log("reRenderFetch",reRenderValue)
  const removedAt = email.replace('@', '');
  const sanitizedEmail = removedAt.replace('.', ''); 
  const expenses = useSelector((state) => state.expense.expenses);

  const fetchData = async () => {
    const response = await fetch(`https://expense-tracker-7d7d2-default-rtdb.firebaseio.com/expense${sanitizedEmail}.json`,
    {
      method:"GET",
      "Content-Ttpe":"appliciation/json"
    })
     const data = await response.json()
    console.log("OUTPUTDATA",data)
    for(const key in data){
      if(data.hasOwnProperty(key)){
        const newData = data[key].ExpenseData
        console.log("newData",newData)
    dispatch(expenseActions.addExpense(newData))
      }
    }
  };

  useEffect(()=>{
    console.log("Effect is running!");
    fetchData()
  },[reRenderValue])


    const totalAmount = expenses.reduce((accumulator, expense) => {
      return accumulator + Number(expense.price);
    }, 0);

    const editHandler = (expense) => {
      dispatch(expenseActions.editExpenses(expense))
      // console.log("iiidd",expense.id)
      dispatch(expenseActions.removeExpense(expense.id));
      };
      const deleteHandler = (expenseID) => {
        updateData(expenseID)
        dispatch(expenseActions.removeExpense(expenseID));
    
      };
      async function updateData(id) {
        const response = await fetch(`https://expense-tracker-7d7d2-default-rtdb.firebaseio.com/expense${sanitizedEmail}.json`, {
          method: "GET",
        });
    
        const data = await response.json();
        // console.log("update", data);
        if (!data || Object.keys(data).length === 0) {
          console.log('No items to update');
          return;
        }
        let itemIdUpdatedata;
        for (const key in data) {
          if (typeof data[key] === 'object') {
            if (data[key].ExpenseData.id === id) {
              itemIdUpdatedata = key;
              break;
            }
          }
        }
        console.log("upID", itemIdUpdatedata);
        const res = await fetch(`https://expense-tracker-7d7d2-default-rtdb.firebaseio.com/expense${sanitizedEmail}/${itemIdUpdatedata}.json`,
        {
          method:"DELETE",
        })
    
      if (res.ok) {
        alert('Item deleted successfully');
        // setReRender(true)
      } else {
        console.error('Failed to delete item');
      }
    
    
    
    
      }
        console.log("AK",expenses)

        
        const isTheme = useSelector((state)=>state.theme.isDarkTheme)

        const downloadFileHandler = () => {
          const csvContent =
            "data:text/csv;charset=utf-8," +
            expenses.map((expense) => Object.values(expense).join(",")).join("\n");
          const encodedUri = encodeURI(csvContent);
          const link = document.createElement("a");
          link.setAttribute("href", encodedUri);
          link.setAttribute("download", "expenses.csv");
          document.body.appendChild(link);
          link.click();
      };
       
      const enableHandler = () => {
        console.log("enable")
        dispatch(enableDarkTheme({isDarkThemeEnable:true}));
      };
  return (
    
     <div className={`${classes.main} ${isTheme ? classes.dark : ''}`}>
     <div className={classes.box}>
        <ul>
            {expenses.map((item)=>(
                <li key={item.id}>{item.price}  {item.description}  {item.category}
                  <button onClick={()=>editHandler(item)} className={classes.edit}>Edit</button>
                <button onClick={() => deleteHandler(item.id)} className={classes.delete}>Delete</button>

                </li>
            ))

            }
        </ul>
        {expenses.length > 0 && 
          <div className={classes.downloadBtn}>
        <button className={classes.btn} onClick={downloadFileHandler} >Download csv</button>
        </div>
        }
     </div>
     <span className={classes.sidebar}>
        <h3 className={classes.sideHeading}>Total Amount</h3>
        {/* Display the calculated totalAmount */}
        <h1 className={classes.totalAmount}> {totalAmount}₹</h1>
        {totalAmount > 10000 && <button onClick={enableHandler} className={classes.newBtn}>Active Premium</button>}
      </span>

    </div>
  )
}

export default OutputExpense