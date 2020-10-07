import React from 'react';
import classes from './Button.module.scss';
const Button = props => {
  let btnClasses = [classes.Button];

  if (props.noBg) {
    btnClasses = [classes.Button, classes.ButtonNoBG];
  } else if (props.bigBorderRadius) {
    btnClasses = [classes.Button, classes.ButtonBigBorderRadius];
  } else if (props.bigBorderRadiusSm) {
    btnClasses = [classes.Button, classes.ButtonBigBorderRadiusSm];
  } else if (props.smallBorderRadius) {
    btnClasses = [classes.Button, classes.ButtonSmallBorderRadius];
  } else if (props.smallBorderRadiusSm) {
    btnClasses = [classes.Button, classes.ButtonSmallBorderRadiusSm];
  } else if (props.copied) {
    btnClasses = [classes.Button, classes.ButtonCopied];
  }

  return (
    <button className={btnClasses.join(' ')} onClick={props.click}>
      {props.children}
    </button>
  );
};

export default Button;
