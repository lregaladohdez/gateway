const util = require('util');
const sails = require('sails');
const supertest = require('supertest');
const faker = require('faker');

beforeAll(async () => {
  console.log('RUUNING ALL');
  await util.promisify(sails.lift)();
  return new Promise((r) => setTimeout(r, 2000));
});

afterAll(async () => util.promisify(sails.lower)());

test('Create Gateway', async () => {
  const result = await supertest(sails.hooks.http.app)
      .post('/gateway/')
      .send({
        serial: faker.random.alphaNumeric(10),
        name: faker.company.companyName(),
        address: faker.internet.ip(),
      });
  expect(result.status).toBe(200);
  expect(result.body.id).toBeDefined();
  expect(result.body.name).toBeDefined();
  expect(result.body.serial).toBeDefined();
  expect(result.body.address).toBeDefined();
});

test('List Gateways', async () => {
  // await util.promisify(sails.lift)({});
  // await new Promise((r) => setTimeout(r, 2000));
  const result = await supertest(sails.hooks.http.app)
      .get('/gateway/')
      .send()
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  expect(result.body).toBeArray();
});

test('Edit Gateway', async () => {
  // await util.promisify(sails.lift)({});
  // await new Promise((r) => setTimeout(r, 2000));
  const result = await supertest(sails.hooks.http.app)
      .post('/gateway/')
      .send({
        serial: faker.random.alphaNumeric(10),
        name: faker.company.companyName(),
        address: faker.internet.ip(),
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
    .expect(200);
  const { id } = result.body;
  const newName = faker.company.companyName();
  const editResult = await supertest(sails.hooks.http.app)
    .patch(`/gateway/${id}`)
    .send({ name: newName })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200);
  expect(editResult.body.name).toBe(newName);
  expect(editResult.body.id).toBe(id);
});

test('Delete Gateway', async () => {
  const result = await supertest(sails.hooks.http.app)
      .post('/gateway/')
      .send({
        serial: faker.random.alphaNumeric(10),
        name: faker.company.companyName(),
        address: faker.internet.ip(),
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
    .expect(200);
  const { id } = result.body;
  const deleteResult = await supertest(sails.hooks.http.app)
    .delete(`/gateway/${id}`)
    .send()
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200);
  expect(deleteResult.body.id).toBe(id);
  const verifyResult = await supertest(sails.hooks.http.app)
    .get(`/gateway/${id}`)
      .send();
  expect(verifyResult.status).toBe(404);
});

test('Validate ipv4', async () => {
  const result = await supertest(sails.hooks.http.app)
      .post('/gateway/')
      .send({
        serial: faker.random.alphaNumeric(10),
        name: faker.company.companyName(),
        address: faker.internet.ipv6(),
      });
  expect(result.status).toBe(400);
});
