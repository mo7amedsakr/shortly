import React from 'react';
import classes from './GetStartedSection.module.scss';
import Button from '../../components/UI/Button/Button';

const GetStarted = () => {
  return (
    <div className={classes.GetStarted}>
      <h2 className={classes.GetStartedH2}>Boost your links today</h2>
      <Button bigBorderRadius>Get Started</Button>
    </div>
  );
};

export default GetStarted;
