import express from 'express';
import { scheduleRouter } from './routers/Schedule';
require('dotenv').config();

const app = express();
const PORT = 8080;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(scheduleRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
