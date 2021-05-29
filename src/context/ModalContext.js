import React, { useState } from 'react';

const ContextModal = React.createContext({
  show: false,
  onShow: () => {},
  onHide: () => {},
});

export function ModalContext(props) {
  const [show, setShow] = useState(false);

  const showHandler = () => {
    setShow((prev) => !prev);
  };
  const hideHandler = () => {
    setShow((prev) => !prev);
  };

  return (
    <ContextModal.Provider
      value={{ show: show, onShow: showHandler, onHide: hideHandler }}>
      {props.children}
    </ContextModal.Provider>
  );
}

export default ContextModal;
