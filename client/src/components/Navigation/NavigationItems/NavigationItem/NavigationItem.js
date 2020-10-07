import React from 'react';
import classes from './NavigationItem.module.scss';

const NavigationItem = props => {
  return (
    <a href="/" className={classes.NavigationItem}>
      {props.children}
    </a>
  );
};

export default NavigationItem;
