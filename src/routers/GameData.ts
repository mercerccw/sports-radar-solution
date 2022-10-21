import express from 'express';
import { GameModel } from '../Schemas/Game';
import { Game } from '../models/Game';
import _ from 'lodash';
import * as sequelize from 'sequelize';
import moment from 'moment';

const gameRouter = express.Router();
const Op = sequelize.Op;

gameRouter.get('/v1/games/:id', async (req, res) => {
  const id: number = Number(req.params.id);

  try {
    const game = await GameModel.findOne({
      where: { id: id },
    });
    res.send(game);
  } catch (err) {
    res.statusCode = 404;
    res.send({
      response: 404,
      message: `No game for id: ${id}`,
    });
  }
});
gameRouter.get('/v1/games', async (req, res) => {
  const days: number = Number(req.query.days_ago);
  try {
    const now = moment.utc();

    // Pull games that started within the last 6 hours
    const games: Game[] = await GameModel.findAll({
      where: {
        eventTime: {
          [Op.lt]: now.format('YYYY-MM-DD HH:mm:ss'),
          [Op.gt]: now.subtract(days, 'days').format('YYYY-MM-DD HH:mm:ss'),
        },
      },
    });
    console.log('Recent Games: ', games.length);

    res.send(games);
  } catch (err) {
    res.statusCode = 404;
    res.send({
      response: 404,
      message: `No schedule for season`,
    });
  }
});

export { gameRouter };
