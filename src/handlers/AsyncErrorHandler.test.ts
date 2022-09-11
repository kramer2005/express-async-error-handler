import { Server } from 'http';
import {app} from '../server'
import supertest, { SuperTest, Test } from 'supertest';

let server: Server
let requestWithSupertest: SuperTest<Test>

beforeAll(() => {
  server = app.listen(3032)
  requestWithSupertest = supertest(server);
})

afterAll(() => {
  server.close()
})

describe('Endpoints', () => {

  it('GET /decorator should return 200', async () => {
    // @ts-ignore
    const res = await requestWithSupertest.get('/decorator');
      expect(res.status).toEqual(200);
  });

  it('GET /wrapper should return 200', async () => {
    // @ts-ignore
    const res = await requestWithSupertest.get('/wrapper');
      expect(res.status).toEqual(200);
  });

});
