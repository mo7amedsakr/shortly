import React from 'react';
import { Container } from '@material-ui/core';
import classes from './Header.module.scss';
import Hero from '../../assets/images/illustration-working.svg';
import Button from '../../components/UI/Button/Button';

const Header = () => {
  return (
    <Container fixed>
      <header className={classes.Header}>
        <div className={classes.HeaderLeft}>
          <h1 className={classes.HeaderLeftH1}>More than just shorter links</h1>
          <p className={classes.HeaderLeftP}>
            Build your brand’s recognition and get detailed insights on how your
            links are performing.
          </p>
          <Button bigBorderRadius>Get Started</Button>
        </div>
        <div className={classes.HeaderRight}>
          <img src={Hero} alt="bitch" className={classes.HeaderRightImg} />
        </div>
      </header>
    </Container>
  );
};
export default Header;
