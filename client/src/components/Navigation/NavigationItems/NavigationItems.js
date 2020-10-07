import React from 'react';
import classes from './NavigationItems.module.scss';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = props => {
  return (
    <div className={classes.NavigationItems}>
      <NavigationItem>Features</NavigationItem>
      <NavigationItem>Pricing</NavigationItem>
      <NavigationItem>Resources</NavigationItem>
    </div>
  );
};

export default NavigationItems;
