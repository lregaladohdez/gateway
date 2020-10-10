const sails = require('sails');
const supertest = require('supertest');
const faker = require('faker');
const util = require('util');

let gatewayId;

beforeAll(async () => {
  await util.promisify(sails.lift)();
  return new Promise((r) => setTimeout(r, 2000));
});

afterAll(async () => util.promisify(sails.lower)());

test('Create Peripheral', async () => {
  const gwResult = await supertest(sails.hooks.http.app)
      .post('/gateway/')
      .send({
        serial: faker.random.alphaNumeric(10),
        name: faker.company.companyName(),
        address: faker.internet.ip(),
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
    .expect(200);
  gatewayId = gwResult.body.id;
  const result = await supertest(sails.hooks.http.app)
      .post('/peripheral/')
      .send({
        uid: faker.random.number(),
        vendor: faker.company.companyName(),
        status: faker.random.boolean() ? 'online' : 'offline',
        gatewayId,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  expect(result.body.uid).toBeDefined();
  expect(result.body.vendor).toBeDefined();
  expect(result.body.status).toBeDefined();
});

test('List Peripherals', async () => {
  const result = await supertest(sails.hooks.http.app)
      .get('/peripheral/')
      .send()
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  expect(result.body).toBeArray();
});

test('Edit Peripheral', async () => {
  const result = await supertest(sails.hooks.http.app)
      .post('/peripheral/')
      .send({
        uid: faker.random.number(),
        vendor: faker.company.companyName(),
        status: faker.random.boolean() ? 'online' : 'offline',
        gatewayId,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
    .expect(200);
  const { id } = result.body;
  const newVendor = faker.company.companyName();
  const editResult = await supertest(sails.hooks.http.app)
    .patch(`/peripheral/${id}`)
    .send({ vendor: newVendor })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200);
  expect(editResult.body.vendor).toBe(newVendor);
  expect(editResult.body.id).toBe(id);
});

test('Delete Peripheral', async () => {
  const result = await supertest(sails.hooks.http.app)
      .post('/peripheral/')
      .send({
        uid: faker.random.number(),
        vendor: faker.company.companyName(),
        status: faker.random.boolean() ? 'online' : 'offline',
        gatewayId,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
    .expect(200);
  const { id } = result.body;
  const deleteResult = await supertest(sails.hooks.http.app)
    .delete(`/peripheral/${id}`)
    .send()
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200);
  expect(deleteResult.body.id).toBe(id);
  await supertest(sails.hooks.http.app)
    .get(`/peripheral/${id}`)
    .send()
    .expect(404);
});

test('Peripheral Limit', async () => {
  const gwResult = await supertest(sails.hooks.http.app)
      .post('/gateway/')
      .send({
        serial: faker.random.alphaNumeric(10),
        name: faker.company.companyName(),
        address: faker.internet.ip(),
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
    .expect(200);
  const { id } = gwResult.body;
  let i = 0;
  while (i < MAX_PERIPHERALS) {
    // eslint-disable-next-line no-await-in-loop
    await supertest(sails.hooks.http.app)
      .post('/peripheral/')
      .send({
        uid: Date.now() + faker.random.number(),
        vendor: faker.company.companyName(),
        status: faker.random.boolean() ? 'online' : 'offline',
        gatewayId: id,
      });
    i += 1;
  }
  const finalResult = await supertest(sails.hooks.http.app)
      .post('/peripheral/')
      .send({
        uid: Date.now() + faker.random.number(),
        vendor: faker.company.companyName(),
        status: faker.random.boolean() ? 'online' : 'offline',
        gatewayId: id,
      });
  expect(finalResult.status).toBe(400);
}, 10000);
