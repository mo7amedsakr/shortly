import React, { useRef, useState } from 'react';
import classes from './ShortenResult.module.scss';
import Button from '../Button/Button';

const ShortenResult = (props) => {
  const [isCopy, setisCopy] = useState(false);
  const shortUrlRef = useRef(null);

  const copyHandler = () => {
    setisCopy(true);
    navigator.clipboard.writeText(shortUrlRef.current.textContent);
    setTimeout(() => {
      setisCopy(false);
    }, 3000);
  };

  return (
    <div className={classes.ShortenResult}>
      <h3 className={classes.ShortenResultOriginal}>
        {props.linkBeforeShorting}
      </h3>
      <div className={classes.ShortenResultLine}></div>
      <h3 className={classes.ShortenResultShorten} ref={shortUrlRef}>
        {props.linkAfterShorting}
      </h3>
      <Button copied={isCopy} smallBorderRadiusSm={!isCopy} click={copyHandler}>
        {isCopy ? 'Copied!' : 'Copy'}
      </Button>
    </div>
  );
};
export default ShortenResult;
