import {  useRef, useState } from 'react';

import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true)
  const amountInputRef = useRef(); 
  
  const submitHandler = (event) => {
    event.preventDefault();

    //  the value is always a string no matter what
    const enteredAmount = amountInputRef.current.value ;
    const enteredAmountNumber = +enteredAmount;

    //trim = to remove any white space
    if (
      enteredAmount.trim().length === 0 || 
      enteredAmountNumber < 1 ||
       enteredAmountNumber > 5 
       ) {
      setAmountIsValid(false)
       return;
    }
    
    props.onAddToCart(enteredAmountNumber)
   };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref = {amountInputRef}
        label='Amount'
        input={{
          id: 'amount_' + props.id,
          type: 'number',
          // the amount that can be added min and max
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please Enter a Valid Amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;