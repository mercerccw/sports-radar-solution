import { GameModel } from './Schemas/Game';
import cron from 'node-cron';
import { Game } from './models/Game';
import { LiveRun } from './models/LiveRun';
import moment from 'moment';
import { LiveRunModel } from './Schemas/LiveRun';

console.log('Live Sport App starting...');

cron.schedule('* * * * *', async () => {
  const run = new LiveRun();
  console.log('Beginning run', run);
  const games: Game[] = await GameModel.findAll();
  for (const game of games) {
    console.log(`Game: ${game.id} | Time: ${game.eventTime}`);
  }
  run.endTime = moment.utc().format('YYYY-MM-DD HH:mm:ss');
  try {
    await LiveRunModel.create(run);
  } catch (err) {
    console.log('Failed to save run', run, err);
  }
  console.log('Run finished', run);
});
