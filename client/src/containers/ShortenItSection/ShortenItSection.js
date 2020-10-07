import React, { useState, useEffect } from 'react';
import classes from './ShortenItSection.module.scss';
import { Container } from '@material-ui/core';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import ShortenResult from '../../components/UI/ShortenResult/ShortenResult';
import axios from 'axios';

const ShortenItSection = () => {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [shortenLinks, setShortenLinks] = useState([]);

  const inputHandler = (value) => {
    setInputValue(value);
  };

  const isUrl = (url) => {
    const urlregx = new RegExp(
      '^https?:\\/\\/' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i'
    ); // fragment locator
    return urlregx.test(url);
  };

  const createShortenLink = async () => {
    if (isUrl(inputValue)) {
      setLoading(true);
      const res = await axios.post(
        'https://short-ly-url.herokuapp.com/api/url',
        {
          url: inputValue,
        }
      );
      setLoading(false);
      console.log(res);
      console.log(res.data);
      console.log(res.data.url);
      setShortenLinks((prev) => [
        {
          original: inputValue,
          shortUrl: res.data.url,
        },
        ...prev,
      ]);

      setLoading(false);
    }
  };

  return (
    <div className={classes.Bg}>
      <Container fixed>
        <section className={classes.ShortenIt}>
          <div className={classes.ShortenItMain}>
            <Input
              value={inputValue}
              change={inputHandler}
              create={createShortenLink}
            />
            <Button smallBorderRadius click={createShortenLink}>
              {loading ? 'LOADING...' : 'Shorten It!'}
            </Button>
          </div>
          <div className={classes.ShortenItResults}>
            {shortenLinks.map((link, i) => (
              <ShortenResult
                key={link.shortUrl}
                linkBeforeShorting={link.original}
                linkAfterShorting={link.shortUrl}
              />
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
};

export default ShortenItSection;
