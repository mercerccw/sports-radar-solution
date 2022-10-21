import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

export class LiveRun {
  id: string;
  startTime: string;
  endTime: string | null;

  constructor() {
    this.id = `${uuidv4()}:${moment().unix()}`;
    this.startTime = moment.utc().format('YYYY-MM-DD HH:mm:ss');
    this.endTime = null;
  }
}
