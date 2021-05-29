import React, { useContext } from 'react';
import CartContext from '../../context/CartContext';
import ContextModal from '../../context/ModalContext';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = () => {
  const ctx = useContext(ContextModal);
  const cartCtx = useContext(CartContext);
  const totalPrice = cartCtx.totalAmount.toFixed(2);
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  return (
    <Modal>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>${totalPrice}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={ctx.onHide}>
          Close
        </button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
