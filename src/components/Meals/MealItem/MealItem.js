import React, { useContext } from 'react';
import CartContext from '../../../context/CartContext';
import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';

function MealItem(props) {
  const ctx = useContext(CartContext);
  const price = `$${props.price.toFixed(2)}`;
  const addCartHandler = (amount) => {
    ctx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} onAddCart={addCartHandler} />
      </div>
    </li>
  );
}

export default MealItem;
