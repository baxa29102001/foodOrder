import React, { useContext, useState } from 'react';
import CartContext from '../../context/CartContext';
import ContextModal from '../../context/ModalContext';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = () => {
  const [orderShow, setOrderShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const ctx = useContext(ContextModal);
  const cartCtx = useContext(CartContext);
  const totalPrice = cartCtx.totalAmount.toFixed(2);
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const showHandler = () => {
    setOrderShow(true);
  };

  const hideShowHandler = () => {
    setOrderShow(false);
  };
  const submitHandler = async (data) => {
    setLoading(true);
    await fetch(
      'https://food-order-b4d91-default-rtdb.firebaseio.com/orders.json',
      {
        method: 'POST',
        body: JSON.stringify({
          userData: data,
          orders: cartCtx.items,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    setLoading(false);
    setSuccess(true);
    cartCtx.clearCart();
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

  const content = (
    <React.Fragment>
      {orderShow && (
        <Checkout onSubmit={submitHandler} onCancel={hideShowHandler} />
      )}
      {!orderShow && cartItems}
      {!orderShow && (
        <React.Fragment>
          <div className={classes.total}>
            <span>Total Amount</span>
            <span>${totalPrice}</span>
          </div>
          <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={ctx.onHide}>
              Close
            </button>
            <button className={classes.button} onClick={showHandler}>
              Order
            </button>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );

  const processLoading = <p>Loading...</p>;
  const submitSuccess = (
    <React.Fragment>
      <p>Success Order...</p>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={ctx.onHide}>
          Close
        </button>
      </div>
    </React.Fragment>
  );
  return (
    <Modal>
      {!loading && !success && content}
      {loading && processLoading}
      {success && submitSuccess}
    </Modal>
  );
};

export default Cart;
