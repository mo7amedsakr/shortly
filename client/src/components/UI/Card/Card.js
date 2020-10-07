import React from 'react';
import classes from './Card.module.scss';

const Card = props => {
  let cardClasses = [classes.Card];

  if (props.position === 'up') {
    cardClasses = [classes.Card, classes.Up];
  } else if (props.position === 'down') {
    cardClasses = [classes.Card, classes.Down];
  }

  if (props.after) {
    cardClasses.push(classes.After);
  }
  return (
    <div className={cardClasses.join(' ')} style={props.style}>
      <div className={classes.CardIcon}>
        <img
          src={props.img}
          alt={props.title}
          className={classes.CardIconImg}
        />
      </div>
      {/* {props.after ? <div className={classes.Line}></div> : null} */}
      <div className={classes.CardText}>
        <h3 className={classes.CardTextH3}>{props.title}</h3>
        <p className={classes.CardTextP}>{props.paragraph}</p>
      </div>
    </div>
  );
};

export default Card;
