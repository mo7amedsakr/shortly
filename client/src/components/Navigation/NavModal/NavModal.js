import React from 'react';
import classes from './NavModal.module.scss';
import NavigationItems from '../NavigationItems/NavigationItems';
import Button from '../../UI/Button/Button';

const NavModal = props => {
  return (
    <div className={props.show ? classes.NavModal : classes.Hide}>
      <NavigationItems />
      <div className={classes.NavModalMiddleLine}>&ensp;</div>
      <div className={classes.NavModalBtns}>
        <Button noBg>Login</Button>
        <Button bigBorderRadiusSm>Sing Up</Button>
      </div>
    </div>
  );
};

export default NavModal;
