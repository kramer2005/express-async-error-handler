import { Server } from 'http';
import {app} from '../server'
import supertest, { SuperTest, Test } from 'supertest';

let server: Server
let requestWithSupertest: SuperTest<Test>

beforeAll(() => {
  server = app.listen(3031)
  requestWithSupertest = supertest(server);
})

afterAll(() => {
  server.close()
})

describe('User Endpoints', () => {

  it('GET /wrapper should return 200', async () => {
    const res = await requestWithSupertest.get('/wrapper');
      expect(res.status).toEqual(200);
  });

});