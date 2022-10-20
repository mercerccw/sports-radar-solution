require('dotenv').config({ path: '.env.sample' });
import request from 'supertest';
const app = require('../src/app');

describe('Test the root path', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});
