import React, { useContext } from 'react';
import meals from '../../assets/meals.jpg';
import ContextModal from '../../context/ModalContext';
import CartButton from './CartButton';
import classes from './Header.module.css';

function Header(props) {
  const ctx = useContext(ContextModal);
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h2>React Meals</h2>
        <div className={classes.source}>
          <a
            href='https://github.com/baxa29102001/foodOrder'
            className={classes.link}>
            <i className={`ri-github-fill ${classes.github}`}></i>
          </a>
          <a
            href='https://github.com/baxa29102001/foodOrder'
            className={classes.link}>
            Source code
          </a>
        </div>
        <CartButton onClick={ctx.onShow} />
      </header>
      <div className={classes['main-image']}>
        <img src={meals} alt='' />
      </div>
    </React.Fragment>
  );
}

export default Header;
