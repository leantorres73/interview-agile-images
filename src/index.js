import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import cron from 'node-cron';

import models from './models';
import routes from './routes';
import { getImagesFromAgile } from './services/images';

const app = express();


// * Application-Level Middleware * //

// Third-Party Middleware

app.use(cors());

// Built-In Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom Middleware

app.use((req, res, next) => {
  req.context = {
    models
  };
  next();
});

// * Routes * //
app.use('/search', routes.search);

// * Start * //
app.listen(process.env.PORT, async () => {
  console.log(`Example app listening on port ${process.env.PORT}!`);
  console.log(`Cron time for reloading images: ${process.env.CRON_TIME} minutes!`);
  // NOTE: We can kill the process if cron time is not defined or API Key also.
  // Initialize images
  await getImagesFromAgile();
  cron.schedule(`*/${process.env.CRON_TIME} * * * *`, () => {
    console.log(`running the task of reloading images every ${process.env.CRON_TIME} minutes`);
    getImagesFromAgile();
  });
});
