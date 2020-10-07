import React from 'react';
import classes from './Footer.module.scss';
import { Container } from '@material-ui/core';
import FooterLinks from '../../components/Footer/FooterLinks/FooterLinks';
import FooterLink from '../../components/Footer/FooterLinks/FooterLink/FooterLink';
import FooterSocialIcon from '../../components/Footer/FooterSocial/FooterSocialIcon';
import Logo from '../../assets/images/logo-white.svg';
import icons from '../../components/Footer/FooterSocial/Icons/Icons';

const Footer = () => {
  const footer = [
    {
      title: 'Features',
      list: ['Link Shortening', 'Branded Links', 'Analytics']
    },
    {
      title: 'Resources',
      list: ['Blog', 'Developers', 'Support']
    },
    {
      title: 'Company',
      list: ['About', 'Our Team', 'Careers', 'Contact']
    }
  ];

  return (
    <div className={classes.Bg}>
      <Container fixed>
        <footer className={classes.Footer}>
          <div className={classes.FooterLogo}>
            <img src={Logo} alt="site logo" className={classes.FooterLogoImg} />
          </div>
          <div className={classes.FooterLinks}>
            {footer.map(el => (
              <FooterLinks title={el.title} key={el.title}>
                {el.list.map(el => (
                  <FooterLink key={el}>{el}</FooterLink>
                ))}
              </FooterLinks>
            ))}
          </div>
          <div className={classes.FooterSocial}>
            {icons.map((icon, i) => (
              <FooterSocialIcon icon={icon} key={i} />
            ))}
          </div>
        </footer>
      </Container>
    </div>
  );
};
export default Footer;
