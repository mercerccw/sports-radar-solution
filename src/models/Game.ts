import moment from 'moment-timezone';

export class Game {
  id: number;
  eventTime: string;
  awayTeam: string;
  homeTeam: string;
  constructor(game: any) {
    this.id = game.id;
    this.eventTime = moment
      .tz(game.est, 'America/New_York')
      .utc()
      .format('YYYY-MM-DD HH:mm:ss');
    this.awayTeam = game.a;
    this.homeTeam = game.h;
  }
}
