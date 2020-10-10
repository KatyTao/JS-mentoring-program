const request = require('supertest');
const server = require('../app.js');

beforeAll(async () => {
  // do something before anything else runs
  console.log('Jest starting!');
});

// close the server after each test
afterAll(() => {
  server.close();
  console.log('server closed!');
});

describe('api tests', () => {
  test('get all weather GET /weather', async () => {
    const response = await request(server).get('/weather');
    expect(response.status).toEqual(200);
    expect(response.text).toContain('weather');
  });
});