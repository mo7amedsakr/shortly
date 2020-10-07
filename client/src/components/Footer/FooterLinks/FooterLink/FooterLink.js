import React from 'react';
import classes from './FooterLink.module.scss';

const FooterLink = props => {
  return (
    <a href="/" className={classes.FooterLink}>
      {props.children}
    </a>
  );
};

export default FooterLink;
