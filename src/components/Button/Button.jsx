import React from 'react';
import PropTypes from 'prop-types';

const Button = ({onClickFunc, onDblClickFunc, holderText = "Button", nameOfClass, typeOfButton = "button", isDisabled}) => {
  if (isDisabled) {
    return (
      <button className={nameOfClass} type={typeOfButton} onClick={onClickFunc} onDoubleClick={onDblClickFunc} disabled>
        {holderText}
      </button>
    );
  } else {
    return (
      <button className={nameOfClass} type={typeOfButton} onClick={onClickFunc} onDoubleClick={onDblClickFunc}>
        {holderText}
      </button>
    )
  };
};

Button.propTypes = {
  onClickFunc: PropTypes.func,
  onDblClickFunc: PropTypes.func,
  holderText: PropTypes.string,
  typeOfButton: PropTypes.string,
  nameOfClass: PropTypes.string,
  isDisabled: PropTypes.bool,
};

export default Button;
