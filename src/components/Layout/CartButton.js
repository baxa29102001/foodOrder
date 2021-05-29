import React, { useContext, useEffect, useState } from 'react';
import CartContext from '../../context/CartContext';
import CartIcon from '../cart/CartIcon';
import classes from './CartButton.module.css';

function CartButton(props) {
  const [show, setShow] = useState(false);
  const ctx = useContext(CartContext);
  const { items } = ctx;
  let classNameItem = `${classes.button} ${show ? classes.bump : ''}`;
  useEffect(() => {
    setShow(true);
    let timer = setTimeout(() => {
      setShow(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  const numberCartItems = ctx.items.reduce((prev, current) => {
    return prev + current.amount;
  }, 0);
  return (
    <button className={classNameItem} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your cart</span>
      <span className={classes.badge}>{numberCartItems}</span>
    </button>
  );
}

export default CartButton;
