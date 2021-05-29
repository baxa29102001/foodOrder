import React, { Fragment, useContext } from 'react';
import ReactDom from 'react-dom';
import ContextModal from '../../context/ModalContext';
import classes from './Modal.module.css';

function BackDrop(props) {
  const ctx = useContext(ContextModal);
  return <div className={classes.backdrop} onClick={ctx.onHide}></div>;
}

function ModalOverlay(props) {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
}

function Modal(props) {
  return (
    <Fragment>
      {ReactDom.createPortal(<BackDrop />, document.getElementById('overlays'))}
      {ReactDom.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        document.getElementById('overlays')
      )}
    </Fragment>
  );
}

export default Modal;
