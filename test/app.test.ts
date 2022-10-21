require('dotenv').config({ path: '.env.sample' });
import * as http from 'http';
import supertest from 'supertest';

const app = require('../src/app');
const apptest = supertest(http.createServer(app));

describe('Test the root path', () => {
  test('It should response the GET method', async () => {
    apptest.get('/healthcheck').expect(200);
  });
});
