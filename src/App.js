import React, { Fragment, useContext } from 'react';
import Cart from './components/cart/Cart';

import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import ContextModal from './context/ModalContext';

function App() {
  const ctx = useContext(ContextModal);
  return (
    <Fragment>
      {ctx.show && <Cart />}
      <Header />
      <main>
        <Meals />
      </main>
    </Fragment>
  );
}

export default App;
//bn=
