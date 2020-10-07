import React from 'react';
import classes from './FooterLinks.module.scss';

const FooterLinks = props => {
  return (
    <div className={classes.FooterLinks}>
      <h3 className={classes.FooterLinksH3}>{props.title}</h3>
      {props.children}
    </div>
  );
};

export default FooterLinks;
