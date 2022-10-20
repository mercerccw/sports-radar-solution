import express from 'express';
import { scheduleRouter } from './routers/Schedule';
const PORT = process.env.NODE_DOCKER_PORT;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(scheduleRouter);
app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

module.exports = app;
