import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import { ModalContext } from './context/ModalContext';
import CartProvider from './context/CartProvider';

ReactDOM.render(
  <ModalContext>
    <CartProvider>
      <App />
    </CartProvider>
  </ModalContext>,
  document.getElementById('root')
);
