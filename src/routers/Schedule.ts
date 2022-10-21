import express from 'express';
import axios from 'axios';
import { GameModel } from '../Schemas/Game';
import { Game } from '../models/Game';
import _ from 'lodash';

const scheduleRouter = express.Router();

scheduleRouter.get('/v1/schedule', async (req, res) => {
  const seasonStart: number = Number(req.query.season_start);
  const seasonEnd: number = Number(req.query.season_end);
  const participatingTeams: any = [];
  let newGames: number = 0;
  let updatedGames: number = 0;

  try {
    const response = await axios.get(
      `https://live.nhl.com/GameData/SeasonSchedule-${seasonStart}${seasonEnd}.json`
    );
    const schedule: Game[] = response.data;
    for (const event of schedule) {
      const game = new Game(event);
      if (!participatingTeams.includes(game.awayTeam)) {
        participatingTeams.push(game.awayTeam);
      }
      if (!participatingTeams.includes(game.homeTeam)) {
        participatingTeams.push(game.homeTeam);
      }
      try {
        const foundItem = await GameModel.findOne({
          where: { id: game.id },
        });
        if (!foundItem) {
          await GameModel.create(game);
          newGames++;
        } else {
          await GameModel.update(_.omit(game, 'id'), {
            where: { id: game.id },
          });
          updatedGames++;
        }
      } catch (err) {
        console.error(err);
      }
    }

    res.send({
      gameCount: schedule.length,
      newGames,
      updatedGames,
      participatingTeams,
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
