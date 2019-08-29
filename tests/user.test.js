const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const app = require('../src/app')
const User = require('../src/models/user')

const testUserId = new mongoose.Types.ObjectId()
const testUser = {
  _id: testUserId,
  name: 'John',
  email: 'john@example.com',
  password: '56what!!',
  tokens: [{
    token: jwt.sign({ _id: testUserId }, process.env.JWT_SECRET)
  }]
}

beforeEach(async () => {
  await User.deleteMany()
  await new User(testUser).save()
})

test('Should signup a new user', async () => {
  await request(app).post('/users').send({
    name: 'Jane',
    email: 'jane@example.com',
    password: 'pass123!'
  }).expect(201)
})

test('Should login existing user', async () => {
  await request(app).post('/users/login').send({
    email: testUser.email,
    password: testUser.password
  }).expect(200)
})

test('Should not login non-existent user', async () => {
  await request(app).post('/users/login').send({
    email: 'nobody@example.com',
    password: 'pass123!!'
  }).expect(400)
})

test('Should get profile for user', async () => {
  await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${testUser.tokens[0].token}`)
    .send()
    .expect(200)
})

test('Should not get profile for unauthenticated user', async () => {
  await request(app)
    .get('/users/me')
    .send()
    .expect(401)
})

test('Should delete account for user', async () => {
  await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${testUser.tokens[0].token}`)
    .send()
    .expect(200)
})

test('Should not delete account for unauthenticated user', async () => {
  await request(app)
    .delete('/users/me')
    .send()
    .expect(401)
})