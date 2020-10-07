import React from 'react';
import classes from './FooterSocialIcon.module.scss';

const FooterSocial = props => {
  return (
    <svg className={classes.Icon}>
      <path d={props.icon} />
    </svg>
  );
};

export default FooterSocial;
