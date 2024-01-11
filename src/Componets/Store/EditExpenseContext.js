import React, { createContext, useEffect, useState } from "react";


const EditExpenseContext = createContext({
      id:'',
  price: 0,
  description: "",
  category: "",
  setPrice: () => {},
  setDescription: () => {},
  setCategory: () => {},
  updatedData:"",
  setUpdatedData:()=>{},
});

export const EditExpenseProvider = (props) => {
      const [id,setId] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [updatedData,setUpdatedData] = useState('');

  const contextValue = {
      id,
    price,
    description,
    category,
    updatedData,
    setId,
    setPrice,
    setDescription,
    setCategory,
    setUpdatedData,
  };
  useEffect(() => {
      console.log("PR", price);
    }, [price, description, category,id]);


  return (
    <EditExpenseContext.Provider value={contextValue}>
      {props.children}
    </EditExpenseContext.Provider>
  );
};

export default EditExpenseContext;