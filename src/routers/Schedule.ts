import express from 'express';
import axios from 'axios';
import { Game } from 'models/Game';

const scheduleRouter = express.Router();

scheduleRouter.get('/v1/schedule', async (req, res) => {
  const seasonStart: number = Number(req.query.season_start);
  const seasonEnd: number = Number(req.query.season_end);
  try {
    const response = await axios.get(
      `https://live.nhl.com/GameData/SeasonSchedule-${seasonStart}${seasonEnd}.json`
    );
    const schedule: Game[] = response.data;
    res.send({
      gameCount: schedule.length,
    });
  } catch (err) {
    res.statusCode = 404;
    res.send({
      response: 404,
      message: `No schedule for season ${seasonStart} - ${seasonEnd}`,
    });
  }
});

export { scheduleRouter };
