import React,{useState,useEffect} from 'react'
import classes from './InputExpense.module.css'
import { expenseActions } from '../Store/expense-slice'
import { useDispatch,useSelector } from 'react-redux'
import { toggleTheme } from '../Store/themeSlice'
const InputExpense = (props) => {
  const dispatch = useDispatch();
  
   // const authCtx=useContext(AuthContext)
    //const EditCtx = useContext(EditExpenseContext);
    const [id, setId] = useState(null); 
    const email = useSelector((state)=>state.auth.userId)
    const removedAt =email.replace('@', '');
  const sanitizedEmail = removedAt.replace('.', '');
    const [price,setPrice]=useState('')
    const [desc,setDesc]=useState('')
    const [category,setCategory]=useState('foods')

   
    const EditCtx = useSelector((state) => state.expense.editOB);

    useEffect(() => {
      setId(EditCtx.id);
      setPrice(EditCtx.price);
      setDesc(EditCtx.description);
      setCategory(EditCtx.category);
    }, [EditCtx.id, EditCtx.price, EditCtx.description, EditCtx.category]);
  
    async function editData(id, updatedData) {
      const response = await fetch(
        `https://expense-tracker-7d7d2-default-rtdb.firebaseio.com/expense${sanitizedEmail}.json`,
        {
          method: "GET",
        }
      );
  
      const data = await response.json();
  
      if (!data || Object.keys(data).length === 0) {
        console.log('No items to update');
        return;
      }
  
      let itemIdToUpdate;
      for (const key in data) {
        if (typeof data[key] === 'object') {
          if (data[key].ExpenseData.id === id) {
            itemIdToUpdate = key;
            break;
          }
        }
      }
  
      console.log("upID", itemIdToUpdate);
  
      if (itemIdToUpdate) {
        const updateResponse = await fetch(
          `https://expense-tracker-7d7d2-default-rtdb.firebaseio.com/expense${sanitizedEmail}/${itemIdToUpdate}.json`,
          {
            method: "PUT",
            body: JSON.stringify({ ExpenseData: updatedData }),
            headers: {
              "Content-type": "application/json",
            },
          }
        );
  
        const updateData = await updateResponse.json();
  
        if (updateData) {
          EditCtx.setUpdatedData(true);
          console.log("PUT Successful");
          dispatch(expenseActions.setReRender({ reRender: true }));
        } else {
          console.log("PUT Failed");
        }
      } else {
        console.log("Item not found for update");
      }
    }

    const SubmitHandler=async(event)=>{
     event.preventDefault();
     console.log(price,desc,category)
     const ExpenseData={
        id: id || Date.now(),
        price,
        description:desc,
        category
     }
     if(id)
     {
         editData(id, ExpenseData);
     }
     else{
       const response= await fetch(`https://expense-tracker-11b1f-default-rtdb.firebaseio.com/expense${sanitizedEmail}.json`,{
        method:'POST',
        body:JSON.stringify({ExpenseData}),
        headers:{
            "Content-type":"application/json"
        }
    
       })
       const data=await response.json()
       console.log("data",data)
       if(response.ok)
       {
        console.log("post succesfull")
       }
    }
    // props.onAdd(ExpenseData) 
    dispatch(expenseActions.addExpense(ExpenseData))
      setId(null)
     setCategory('')
     setDesc('')
     setPrice('')
    }
    const isTheme = useSelector((state)=>state.theme.isDarkTheme)

    const isDarkThemeEnable = useSelector(
      (state) => state.theme.isDarkThemeEnable
    );
    const toggleHandler = () => {
      dispatch(toggleTheme({ isDarkTheme: true }));
    };
  return (
    
       <div className={`${classes.main} ${isTheme ? classes.dark : ''}`}>
     <div className={classes.box}>
        <form onSubmit={SubmitHandler}  className={classes.form}> 
        
            <div className={classes.int}>
            <label htmlFor='price'>Price :- </label>
            <input type='number' id='price'
             onChange={(e)=>{setPrice(e.target.value)}} value={price}
             ></input>
            </div>
            <div className={classes.int}>
            <label htmlFor='desc'>Description :- </label>
            <input type='text' id='desc' 
            onChange={(e)=>{setDesc(e.target.value)}} value={desc}
            ></input>
            </div>
            <div className={classes.int}>
                <label htmlFor='category'>Category</label>
            <select 
            onChange={(e)=>{setCategory(e.target.value)}}  value={category}>
                
                <option value="foods">Foods</option>
                <option value="moives">Moives</option>
                <option value="petrol">Petrol</option>
            </select>
            </div>
           <button type='submit'>{ id ? 'update' : 'Add Expense'}</button>
        </form>
     </div>
     {isDarkThemeEnable && (
              <button className={classes.toggleBtn} onClick={toggleHandler}>
                toogle
              </button>
            )}
    </div>
  )
}

export default InputExpense