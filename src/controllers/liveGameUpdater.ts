import { GameModel } from '../Schemas/Game';
import axios from 'axios';
import { Game } from '../models/Game';
import { LiveRun } from '../models/LiveRun';
import moment from 'moment';
import { LiveRunModel } from '../Schemas/LiveRun';
import * as sequelize from 'sequelize';
import _ from 'lodash';

const Op = sequelize.Op;

export async function liveGameUpdate() {
  const run = new LiveRun();
  const now = moment.utc();
  console.log('Beginning run', run);

  // Pull games that started within the last 6 hours
  const games: Game[] = await GameModel.findAll({
    where: {
      eventTime: {
        [Op.lt]: now.format('YYYY-MM-DD HH:mm:ss'),
        [Op.gt]: now.subtract(6, 'hours').format('YYYY-MM-DD HH:mm:ss'),
      },
    },
  });
  console.log('Recent Games: ', games.length);

  for (const game of games) {
    try {
      console.log(`Game: ${game.id} | Time: ${game.eventTime}`);
      const response = await axios.get(
        `https://statsapi.web.nhl.com/api/v1/game/${game.id}/feed/live`
      );
      const updatedGame = new Game(game);
      updatedGame.fullContent = JSON.stringify(response.data);
      console.log(updatedGame);
      await GameModel.update(_.omit(updatedGame, 'id'), {
        where: { id: game.id },
      });
    } catch (err) {
      console.log(err);
    }
  }
  run.endTime = moment.utc().format('YYYY-MM-DD HH:mm:ss');
  try {
    await LiveRunModel.create(run);
  } catch (err) {
    console.log('Failed to save run', run, err);
  }
  console.log('Run finished', run);
}
