import React from 'react';
import { MDBBtn } from 'mdbreact';

const MyButton = ({
  onClick,
  className = '',
  color = '',
  children,
  ...rest
}) => (
  <MDBBtn
    onClick={onClick}
    className={className}
    color={color}
    type="button"
    {...rest}
  >
    {children}
  </MDBBtn>
);

export default MyButton;
