import express from 'express';
import { gameRouter } from './routers/GameData';
import { scheduleRouter } from './routers/Schedule';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(scheduleRouter);
app.use(gameRouter);
app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

export { app };
