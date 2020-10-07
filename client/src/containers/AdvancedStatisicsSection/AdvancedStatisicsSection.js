import React from 'react';
import { Container } from '@material-ui/core';
import classes from './AdvancedStatisicsSection.module.scss';
import Card from '../../components/UI/Card/Card';
import BrandRecognitionIcon from '../../assets/images/icon-brand-recognition.svg';
import DetailedRecordsIcon from '../../assets/images/icon-detailed-records.svg';
import FullyCustomizableIcon from '../../assets/images/icon-fully-customizable.svg';

const AdvancedStatisics = () => {
  const cards = [
    {
      title: 'Brand Recognition',
      img: BrandRecognitionIcon,
      paragraph: `
      Boost your brand recognition with each click. Generic links don’t 
      mean a thing. Branded links help instil confidence in your content.
      `,
      position: 'up',
      style: {
        marginRight: '4rem'
      },
      after: true
    },
    {
      title: 'Detailed Records',
      img: DetailedRecordsIcon,
      paragraph: `
      Gain insights into who is clicking your links. Knowing when and where 
      people engage with your content helps inform better decisions.
      `,
      position: 'same',
      style: null,
      after: true
    },
    {
      title: 'Fully Customizable',
      img: FullyCustomizableIcon,
      paragraph: `
      Improve brand awareness and content discoverability through customizable 
      links, supercharging audience engagement.
      `,
      position: 'down',
      style: {
        marginLeft: '4rem'
      },
      after: false
    }
  ];

  return (
    <div className={classes.Bg}>
      <Container fixed>
        <section className={classes.AdvancedStatisics}>
          <div className={classes.AdvancedStatisicsText}>
            <h2 className={classes.AdvancedStatisicsTextH2}>
              Advanced Statistics
            </h2>
            <p className={classes.AdvancedStatisicsTextP}>
              Track how your links are performing across the web with our
              advanced statistics dashboard.
            </p>
          </div>
          <div className={classes.AdvancedStatisicsCards}>
            {cards.map(card => (
              <Card
                key={card.title}
                title={card.title}
                paragraph={card.paragraph}
                img={card.img}
                style={card.style}
                position={card.position}
                after={card.after}
              />
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
};

export default AdvancedStatisics;
