import React, { useRef } from 'react';
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

function MealItemForm(props) {
  const amountRef = useRef();
  const submitHandler = (eve) => {
    eve.preventDefault();

    const amount = amountRef.current.value;
    const amountNumber = +amount;

    if (amount.trim().length === 0 || amountNumber < 1 || amountNumber > 5) {
      return;
    }

    props.onAddCart(amountNumber)
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountRef}
        label='Amount'
        input={{
          id: 'amount_' + props.id,
          type: 'number',
          min: '1',
          max: '5',
          defaultValue: '1',
        }}
      />
      <button>Add</button>
    </form>
  );
}

export default MealItemForm;
