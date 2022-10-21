import cron from 'node-cron';
import { liveGameUpdate } from './controllers/liveGameUpdater';

console.log('Live Sport App starting...');
cron.schedule('* * * * *', async () => {
  await liveGameUpdate();
});
