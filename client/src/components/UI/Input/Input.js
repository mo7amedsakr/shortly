import React from 'react';
import classes from './Input.module.scss';

const Input = (props) => {
  return (
    <input
      placeholder="Example: https://www.google.com"
      type="text"
      className={classes.Input}
      value={props.value}
      onChange={(e) => props.change(e.target.value)}
      onKeyDown={(e) => (e.keyCode === 13 ? props.create() : null)}
    />
  );
};

export default Input;
