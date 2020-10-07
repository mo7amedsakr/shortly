import 'reflect-metadata';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import {
  createConnection,
  getRepository,
  Column,
  Entity,
  PrimaryColumn,
} from 'typeorm';
import uniqid from 'uniqid';

process.on('uncaughtException', (err) => {
  console.log('UNCAUGH EXCEPTION! SHUTTING DOWN......');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './.env' });

const isUrl = (url: string) => {
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

@Entity()
export class Url {
  @PrimaryColumn()
  slug!: string;
  @Column()
  url!: string;
}

createConnection({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  // synchronize: true,
  logging: false,
  entities: [Url],
  ssl: {
    rejectUnauthorized: false,
  },
})
  .then((connection) => {
    console.log('DATABASE CONNECTED!!');
    const app = express();
    app.use(cors());
    app.options('*', cors());
    app.use(express.json());

    const urlRepo = getRepository(Url);

    app.post('/api/url', async (req, res) => {
      if (!isUrl(req.body.url)) {
        return res.status(400).json({
          error: 'Invalid Url.',
        });
      }
      const newUrl = new Url();
      newUrl.slug = uniqid();
      newUrl.url = req.body.url;
      try {
        const url = await urlRepo.save(newUrl);
        res.status(201).json({
          url: `${req.protocol}://${req.hostname}/${url.slug}`,
        });
      } catch (error) {
        res.status(500).json({
          error: 'Something went wrong!',
        });
      }
    });

    app.get('/:slug', async (req, res) => {
      try {
        const url = await urlRepo.findOne({ slug: req.params.slug });
        if (!url) {
          throw new Error('Url not found.');
        }
        res.status(301).redirect(url.url);
      } catch (error) {
        res.status(404).json({
          error: error.message,
        });
      }
    });

    const port = process.env.PORT || 4000;

    const server = app.listen(port, () => {
      console.log(`App running on http://127.0.0.1:${port}`);
    });

    process.on('unhandledRejection', (err: Error) => {
      console.log('UNHANDLER REJECTION! SHUTTING DOWN......');
      console.log(err.name, err.message);
      server.close(() => {
        process.exit(1);
      });
    });

    process.on('SIGTERM', () => {
      console.log('SIGTERM RECEIVED. Shutting down gracefully');
      server.close(() => {
        console.log('Process terminated!');
      });
    });
  })
  .catch(console.error);
