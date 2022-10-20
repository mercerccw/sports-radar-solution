import express from 'express';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { Game } from '../models/Game';
import { sequelize } from '../database';

const scheduleRouter = express.Router();

scheduleRouter.get('/v1/schedule', async (req, res) => {
  const seasonStart: number = Number(req.query.season_start);
  const seasonEnd: number = Number(req.query.season_end);
  const teams: any = [];
  try {
    const response = await axios.get(
      `https://live.nhl.com/GameData/SeasonSchedule-${seasonStart}${seasonEnd}.json`
    );
    const schedule: Game[] = response.data.map((item: any) => {
      const game = new Game(item);
      if (!teams.includes(game.awayTeam)) {
        teams.push(game.awayTeam);
      }
      if (!teams.includes(game.homeTeam)) {
        teams.push(game.homeTeam);
      }
      return new Game(game);
    });
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
    res.send({
      gameCount: schedule.length,
      teams,
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
