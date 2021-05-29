import React, { useReducer } from 'react';
import CartContext from './CartContext';

const obj = {
  items: [],
  totalAmount: 0,
};

const cartReducerFunc = (state, action) => {
  switch (action.type) {
    case 'ADD__ITEM':
      let updateItem;
      let updateItems;
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      const itemMeal = state.items[itemIndex];
      if (itemMeal) {
        updateItem = {
          ...itemMeal,
          amount: itemMeal.amount + action.payload.amount,
        };
        updateItems = [...state.items];
        updateItems[itemIndex] = updateItem;
      } else {
        updateItems = state.items.concat(action.payload);
      }
      return {
        items: updateItems,
        totalAmount:
          state.totalAmount + action.payload.price * action.payload.amount,
      };
    case 'REMOVE__ITEM':
      let arrNew;
      let indexRemove = state.items.findIndex(
        (item) => item.id === action.payload
      );
      let removeItem = state.items[indexRemove];
      let total = state.totalAmount - removeItem.price;
      if (removeItem.amount === 1) {
        arrNew = state.items.filter((item) => item.id !== action.payload);
      } else {
        let updateItem = {
          ...removeItem,
          amount: removeItem.amount - 1,
        };
        arrNew = [...state.items];
        arrNew[indexRemove] = updateItem;
      }
      return {
        items: arrNew,
        totalAmount: total,
      };
    default:
      return obj;
  }
};

function CartProvider(props) {
  const [cartState, dispatchCart] = useReducer(cartReducerFunc, obj);
  const addItemToCart = (item) => {
    dispatchCart({
      type: 'ADD__ITEM',
      payload: item,
    });
  };

  const removeItemCart = (id) => {
    dispatchCart({
      type: 'REMOVE__ITEM',
      payload: id,
    });
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCart,
    removeItem: removeItemCart,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartProvider;
