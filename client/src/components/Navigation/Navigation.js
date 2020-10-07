import React, { useState } from 'react';
import classes from './Navigation.module.scss';
import { Container } from '@material-ui/core';
import NavigationItems from './NavigationItems/NavigationItems';
import Button from '../UI/Button/Button';
import Logo from '../../assets/images/logo.svg';
import HamburgerIcon from './HamburgerIcon/HamburgerIcon';
import NavModal from './NavModal/NavModal';

const Navigation = (props) => {
  const [showModal, setShowModal] = useState(false);

  const toggleNavModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <Container fixed>
      <nav className={classes.Navigation}>
        <div className={classes.NavigationLeft}>
          <img
            src={Logo}
            alt="site logo"
            className={classes.NavigationLeftLogo}
          />
          <div className={classes.NavigationLeftItems}>
            <NavigationItems />
          </div>
        </div>
        <div className={classes.NavigationRight}>
          <Button noBg>Login</Button>
          <Button bigBorderRadiusSm>Sing Up</Button>
        </div>
        <div className={classes.NavigationMobile}>
          <HamburgerIcon click={toggleNavModal} />
          <NavModal show={showModal} />
        </div>
      </nav>
    </Container>
  );
};

export default Navigation;
