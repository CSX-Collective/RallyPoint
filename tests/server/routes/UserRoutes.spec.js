const expect = require('chai').expect;
const supertest = require('supertest-as-promised');
const faker = require('faker');
const db = require('../../../server/database/database');
const user = require('../fixtures/userFixtures');
const { _id, email, password, first_name, last_name, dob } = user;

// This agent refers to PORT where program is runninng.

const server = supertest.agent('http://localhost:8080');

describe('GET /users', function() {
  
  beforeEach(function(done) {
    db.query(`delete from users; insert into users (_id, email, password, first_name, last_name, dob) values (${_id}, '${email}', '${password}', '${first_name}', '${last_name}', '${dob}')`, (err) => {
      if (err) done(err);
      done();
    });
  });

  it('Should get all users', function(done) {
    server
    .get('/users')
    .expect(200)
    .end(function(err, res) {
      if (err) done(err);

      expect(res.body).to.exist;
      expect(res.body[0]._id).to.eql(1);
      done();
    });
  });

  it ('Should fetch user', function(done) {
    server
    .get('/users/1')
    .expect(200)
    .end(function(err, res) {
      if (err) done(err);

      expect(res.body._id).to.eql(1);
      expect(res.body.email).to.eql('test@xyz.io');
      done();
    });
  });

  it ('Should return nothing when fetching nonexistent user', function(done) {
    server
    .get('/users/3000')
    .expect(200)
    .end(function(err, res) {
      if (err) done(err);

      expect(res.body).to.exist;
      expect(res.body).to.eql({});
      done();
    });
  });
});

describe('DELETE /users', function() {

  beforeEach(function(done) {
    db.query(`delete from users; insert into users (_id, email, password, first_name, last_name, dob) values (${_id}, '${email}', '${password}', '${first_name}', '${last_name}', '${dob}')`, (err) => {
      if (err) done(err);
      done();
    });
  });

  it ('Should delete user', function(done) {
    server
    .delete('/users/1')
    .expect(204)
    .end(function(err, res) {
      if (err) done(err);

      db.query(`select * from users where _id= $1`, [1], (err, user) => {
        if (err) done(err);

        expect(user.rows).to.eql([]);
        done();
      })
    });
  });

  it ('Should handle delete of nonexistent user', function(done) {
    server
    .delete('/users/24000')
    .expect(204)
    .end(done);
  });
}); 

describe('PATCH /users', function() {

  beforeEach(function(done) {
    db.query(`delete from users; insert into users (_id, email, password, first_name, last_name, dob) values (${_id}, '${email}', '${password}', '${first_name}', '${last_name}', '${dob}')`, (err) => {
      if (err) done(err);
      done();
    });
  });

  it (`Should update user's email`, function(done) {
    server
    .patch('/users/1')
    .send({ email: 'hacker@aim.com' })
    .expect(204)
    .end(function(err, res) {
      if (err) done(err);

      db.query(`select email from users where _id= $1`, [1], (err, user) => {
        if (err) done(err);

        expect(user.rows[0].email).to.eql('hacker@aim.com');
        done();
      });
    });
  });

  it ('Should send error response with invalid request body', function(done) {
    server
    .patch('/users/1')
    .send({ key: 'confidential' })
    .expect(400)
    .end(function(err, res) {
      if (err) done(err);

      db.query(`select * from users where _id= $1`, [1], (err, user) => {
        if (err) done(err);

        expect(user.rows[0]).to.exist;
        expect(user.rows[0].key).to.not.exist;
        done();
      });
    });
  });

  it ('Should handle update of nonexistent user', function(done) {
    server
    .patch('/users/8888888')
    .send({ email: 'faker@hi.com' })
    .expect(204)
    .end(done);
  });
});

describe('POST /users', function() {
 
  it ('Should create user', function(done) {
    const email = faker.internet.email();

    server
    .post('/users')
    .send({
      email,
      password: 'ImcoolIswear24',
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      dob: new Date("August 28, 2016 11:00:00"),
    })
    .expect(201)
    .end(function(err, res) {
      if (err) done(err);

      db.query(`select * from users where email= $1`, [email], (err, user) => {
        if (err) done(err);

        expect(user.rows[0]).to.exist;
        expect(user.rows[0]._id).to.exist;
        done();
      }); 
    });
  });

  it ('Should send error response with invalid request body', function(done) {
    const email = faker.internet.email();

    server
    .post('/users')
    .send({
      email,
      password: 'ImcoolIswear24',
      last_name: faker.name.lastName(),
    })
    .expect(400)
    .end(function(err, res) {
      if (err) done(err);

      db.query(`select email from users where email= $1`, [email], (err, user) => {
        if (err) done(err);

        expect(user.rows).to.eql([]);
        done();
      });
    });
  });

  it ('Should login user', function(done) {
    server
    .post('/users/login')
    .send({
      email: 'test@xyz.io',
      password: 'Shoes2231',
    })
    .expect(201)
    .end(done);
  });

  it ('Should handle login of nonexistent user', function(done) {
    server
    .post('/users/login')
    .send({
      email: 'wrong@yahoo.com',
      password: 'yourenotCoolIknow901',
    })
    .expect(401)
    .end(done);
  });

  it ('Should handle login with incorrect password', function(done) {
    server
    .post('/users/login')
    .send({
      email: 'test@xyz.io',
      password: 'Puppies87',
    })
    .expect(401)
    .end(done);
  });
}); 
