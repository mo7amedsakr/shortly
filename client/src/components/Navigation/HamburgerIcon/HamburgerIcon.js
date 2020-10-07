import React from 'react';
import classes from './HamburgerIcon.module.scss';

const HamburgerIcon = (props) => {
  return <div className={classes.HamburgerIcon} onClick={props.click}></div>;
};

export default HamburgerIcon;
